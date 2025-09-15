"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function PromotionPage() {
  // Base state
  const [requirements, setRequirements] = useState(
    [
      "• Post at least one promo story 24h before the event.",
      "• Tag the official league account in all promo posts.",
      "• Link to the official site/stream in description.",
      "• Use the official event hashtag.",
      "• No swearing, abusive language, or incitement.",
    ].join("\n")
  );

  // Structured helpers (optional)
  const [officialHandle, setOfficialHandle] = useState("@OfficialLeague");
  const [officialUrl, setOfficialUrl] = useState("https://league.example.com/event");
  const [officialHashtag, setOfficialHashtag] = useState("#BigEvent2025");

  // Toggles for quick rules
  const [mustTag, setMustTag] = useState(true);
  const [mustLink, setMustLink] = useState(true);
  const [mustUseHashtag, setMustUseHashtag] = useState(true);
  const [familyFriendly, setFamilyFriendly] = useState(true);

  const handleSave = () => {
    const payload = {
      requirements,
      rules: {
        mustTag,
        mustLink,
        mustUseHashtag,
        familyFriendly,
      },
      references: {
        officialHandle,
        officialUrl,
        officialHashtag,
      },
    };
    // Mock save
    console.log("[Promotion Rules] saving...", payload);
    alert("Promotion requirements saved (mock). Check console for payload.");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Promotion Rules</h1>
          <p className="text-gray-600 mt-1">
            Define what creators must do to promote your event.
          </p>
        </div>
        <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
          Save Rules
        </Button>
      </div>

      {/* Main card */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Requirements (Description)</CardTitle>
          <CardDescription>
            Outline the obligations for creators. This text will be shared with them when you grant access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Freeform description */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements*</Label>
            <Textarea
              id="requirements"
              rows={8}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder={`e.g.\n• Post at least one promo story 24h before the event.\n• Tag @OfficialLeague in promo posts.\n• Link to https://league.example.com/event\n• Use #BigEvent2025\n• No profanity/abuse.`}
              className="resize-y"
            />
            <p className="text-xs text-gray-500">
              Use bullet points for clarity. This will be stored with the event.
            </p>
          </div>

          <Separator />

          {/* Quick rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>Must Tag Official Account</Label>
                  <p className="text-sm text-gray-600">
                    Require tagging in all promotional posts.
                  </p>
                </div>
                <Switch checked={mustTag} onCheckedChange={setMustTag} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialHandle">Official Account Handle</Label>
                <Input
                  id="officialHandle"
                  value={officialHandle}
                  onChange={(e) => setOfficialHandle(e.target.value)}
                  placeholder="@YourLeague"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>Must Link to Official Site/Stream</Label>
                  <p className="text-sm text-gray-600">
                    Require a clickable link in description or bio.
                  </p>
                </div>
                <Switch checked={mustLink} onCheckedChange={setMustLink} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialUrl">Official URL</Label>
                <Input
                  id="officialUrl"
                  type="url"
                  value={officialUrl}
                  onChange={(e) => setOfficialUrl(e.target.value)}
                  placeholder="https://example.com/stream"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>Must Use Official Hashtag</Label>
                  <p className="text-sm text-gray-600">
                    Ensure consistency across social posts.
                  </p>
                </div>
                <Switch checked={mustUseHashtag} onCheckedChange={setMustUseHashtag} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialHashtag">Official Hashtag</Label>
                <Input
                  id="officialHashtag"
                  value={officialHashtag}
                  onChange={(e) => setOfficialHashtag(e.target.value)}
                  placeholder="#EventHashtag"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>Family-Friendly Content</Label>
                  <p className="text-sm text-gray-600">
                    No swearing, abuse, or incitement during promo or stream.
                  </p>
                </div>
                <Switch checked={familyFriendly} onCheckedChange={setFamilyFriendly} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
              Save Rules
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
