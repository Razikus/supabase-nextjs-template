"use client";

import React, { useState, useEffect } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPASassClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2, Plus, Trash2, AlertCircle } from 'lucide-react';
import Confetti from '@/components/Confetti';

import { Database } from '@/lib/types';

type Task = Database['public']['Tables']['todo_list']['Row'];
type NewTask = Database['public']['Tables']['todo_list']['Insert'];

interface CreateTaskDialogProps {
    onTaskCreated: () => Promise<void>;
}

function CreateTaskDialog({ onTaskCreated }: CreateTaskDialogProps) {
    const { user } = useGlobal();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [isUrgent, setIsUrgent] = useState<boolean>(false);

    const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !user?.id) return;

        try {
            setLoading(true);
            const supabase = await createSPASassClient();
            const newTask: NewTask = {
                title: newTaskTitle.trim(),
                description: newTaskDescription.trim() || null,
                urgent: isUrgent,
                owner: user.id,
                done: false
            };

            const { error: supabaseError } = await supabase.createTask(newTask);
            if (supabaseError) throw supabaseError;

            setNewTaskTitle('');
            setNewTaskDescription('');
            setIsUrgent(false);
            setOpen(false);
            await onTaskCreated();
        } catch (err) {
            setError('Failed to add task');
            console.error('Error adding task:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleAddTask} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Task title"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            placeholder="Task description (optional)"
                            rows={3}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isUrgent}
                                onChange={(e) => setIsUrgent(e.target.checked)}
                                className="rounded border-gray-300 focus:ring-primary-500"
                            />
                            <span className="text-sm">Mark as urgent</span>
                        </label>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-600 text-white hover:bg-primary-700"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Task
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function TaskManagementPage() {
    const { user } = useGlobal();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [filter, setFilter] = useState<boolean | null>(null);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    useEffect(() => {
        if (user?.id) {
            loadTasks();
        }
    }, [filter, user?.id]);

    const loadTasks = async (): Promise<void> => {
        try {
            const isFirstLoad = initialLoading;
            if (!isFirstLoad) setLoading(true);

            const supabase = await createSPASassClient();
            const { data, error: supabaseError } = await supabase.getMyTodoList(1, 100, 'created_at', filter);

            if (supabaseError) throw supabaseError;
            setTasks(data || []);
        } catch (err) {
            setError('Failed to load tasks');
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    const handleRemoveTask = async (id: number): Promise<void> => {
        try {
            const supabase = await createSPASassClient();
            const { error: supabaseError } = await supabase.removeTask(id);
            if (supabaseError) throw supabaseError;
            await loadTasks();
        } catch (err) {
            setError('Failed to remove task');
            console.error('Error removing task:', err);
        }
    };

    const handleMarkAsDone = async (id: number): Promise<void> => {
        try {
            const supabase = await createSPASassClient();
            const { error: supabaseError } = await supabase.updateAsDone(id);
            if (supabaseError) throw supabaseError;
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);

            await loadTasks();
        } catch (err) {
            setError('Failed to update task');
            console.error('Error updating task:', err);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Task Management</CardTitle>
                        <CardDescription>Manage your tasks and to-dos</CardDescription>
                    </div>
                    <CreateTaskDialog onTaskCreated={loadTasks} />
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="mb-6 flex gap-2">
                        <Button
                            variant={filter === null ? "default" : "secondary"}
                            onClick={() => setFilter(null)}
                            size="sm"
                            className={filter === null ? "bg-primary-600 text-white hover:bg-primary-700" : ""}
                        >
                            All Tasks
                        </Button>
                        <Button
                            variant={filter === false ? "default" : "secondary"}
                            onClick={() => setFilter(false)}
                            size="sm"
                            className={filter === false ? "bg-primary-600 text-white hover:bg-primary-700" : ""}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === true ? "default" : "secondary"}
                            onClick={() => setFilter(true)}
                            size="sm"
                            className={filter === true ? "bg-primary-600 text-white hover:bg-primary-700" : ""}
                        >
                            Completed
                        </Button>
                    </div>

                    <div className="space-y-3 relative">
                        {loading && (
                            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm">
                                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                            </div>
                        )}

                        {tasks.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No tasks found</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`p-4 border rounded-lg transition-colors ${
                                        task.done ? 'bg-muted' : 'bg-card'
                                    } ${
                                        task.urgent && !task.done ? 'border-red-200' : 'border-border'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium ${task.done ? 'line-through text-muted-foreground' : ''}`}>
                                                {task.title}
                                            </h3>
                                            {task.description && (
                                                <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                                            )}
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">
                                                    Created: {new Date(task.created_at).toLocaleDateString()}
                                                </span>
                                                {task.urgent && !task.done && (
                                                    <span className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded-full">
                                                        Urgent
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {!task.done && (
                                                <Button
                                                    onClick={() => handleMarkAsDone(task.id)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </Button>
                                            )}
                                            <Button
                                                onClick={() => handleRemoveTask(task.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
            <Confetti active={showConfetti} />
        </div>
    );
}