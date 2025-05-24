import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;
    const testimonials = [
        {
            quote: "This template helped us launch our SaaS product in just two weeks. The authentication and multi-tenancy features are rock solid.",
            author: "Sarah Chen",
            role: "CTO, TechStart",
            avatar: "SC"
        },
        {
            quote: "The best part is how well thought out the organization management is. It saved us months of development time.",
            author: "Michael Roberts",
            role: "Founder, DataFlow",
            avatar: "MR"
        },
        {
            quote: "Clean code, great documentation, and excellent support. Exactly what we needed to get our MVP off the ground.",
            author: "Jessica Kim",
            role: "Lead Developer, CloudScale",
            avatar: "JK"
        }
    ];

    return (
        <div className="flex min-h-screen">
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white relative">
                <Link
                    href="/"
                    className="absolute left-8 top-8 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Homepage
                </Link>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        {productName}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    {children}
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 to-primary-800">
                <div className="w-full flex items-center justify-center p-12">
                    <div className="space-y-6 max-w-lg">
                        <h3 className="text-white text-2xl font-bold mb-8">
                            Trusted by developers worldwide
                        </h3>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="relative bg-white/5 backdrop-blur-xs rounded-xl p-6 border border-white/10 shadow-xl"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-primary-400/30 flex items-center justify-center text-white font-semibold">
                                            {testimonial.avatar}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white/90 mb-2 font-light leading-relaxed">
                                            &#34;{testimonial.quote}&#34;
                                        </p>
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-white">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-sm text-primary-200">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 text-center">
                            <p className="text-primary-100 text-sm">
                                Join thousands of developers building with {productName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}