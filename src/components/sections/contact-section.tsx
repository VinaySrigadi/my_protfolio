"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      reset();
      
      // Reset status after 5s
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
    }
  }

  return (
    <Section id="contact" spacing="lg">
      <SectionHeading 
        eyebrow="Get In Touch"
        title="Let's Build Together"
        gradientWord="Together"
        description="Have a project in mind, looking for collaboration, or just want to say hi? I'd love to hear from you."
      />

      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
          <FadeIn delay={0.2} direction="right">
            <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-6">Contact Information</h3>
            <div className="space-y-6">
              <a href="tel:+919004979349" className="flex items-center gap-4 text-[#A1A1AA] hover:text-[#2563EB] transition-colors">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAFAFA]">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">Phone</p>
                  <p className="text-sm">+91 9004979349</p>
                </div>
              </a>
              <a href="mailto:vsrigadi@gmail.com" className="flex items-center gap-4 text-[#A1A1AA] hover:text-[#2563EB] transition-colors">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAFAFA]">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">Email</p>
                  <p className="text-sm">vsrigadi@gmail.com</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/VinaySrigadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#A1A1AA] hover:text-[#2563EB] transition-colors">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FAFAFA]">
                  <Linkedin className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FAFAFA]">LinkedIn</p>
                  <p className="text-sm">linkedin.com/in/VinaySrigadi</p>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-3">
          <FadeIn delay={0.1} direction="up">
            <GlowCard className="p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 h-full min-h-[300px]">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
                  <CheckCircle className="size-8" />
                </div>
                <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Message Sent!</h3>
                <p className="text-[#A1A1AA]">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-medium text-[#2563EB] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#FAFAFA]">Name</label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className={cn("bg-white/5 border-white/10 focus-visible:ring-[#2563EB]", errors.name && "border-red-500/50 focus-visible:ring-red-500")}
                      {...register("name")} 
                      disabled={status === "submitting"}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#FAFAFA]">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className={cn("bg-white/5 border-white/10 focus-visible:ring-[#2563EB]", errors.email && "border-red-500/50 focus-visible:ring-red-500")}
                      {...register("email")} 
                      disabled={status === "submitting"}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[#FAFAFA]">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="Project Inquiry" 
                    className={cn("bg-white/5 border-white/10 focus-visible:ring-[#2563EB]", errors.subject && "border-red-500/50 focus-visible:ring-red-500")}
                    {...register("subject")} 
                    disabled={status === "submitting"}
                  />
                  {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#FAFAFA]">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Hello Vinay, I'd like to discuss..." 
                    className={cn("min-h-[150px] bg-white/5 border-white/10 focus-visible:ring-[#2563EB] resize-y", errors.message && "border-red-500/50 focus-visible:ring-red-500")}
                    {...register("message")} 
                    disabled={status === "submitting"}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="size-4 shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <MagneticButton className="w-full" as="div">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3",
                      "text-sm font-medium text-white transition-all duration-200",
                      "hover:bg-[#3b82f6] hover:shadow-lg hover:shadow-[#2563EB]/25",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
                      "disabled:opacity-70 disabled:cursor-not-allowed"
                    )}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}
            </GlowCard>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
