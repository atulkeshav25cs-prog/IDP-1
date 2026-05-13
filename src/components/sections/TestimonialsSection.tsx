"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Carevo helped me realize that my passion wasn't coding — it was designing experiences. I switched to UX and couldn't be happier.",
    name: "Priya Sharma",
    role: "Computer Science Student → UX Designer",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote: "I was overwhelmed with options after graduation. The AI gave me clarity, a roadmap, and the confidence to pursue product management.",
    name: "James Rodriguez",
    role: "Marketing Exec → Data Analyst",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote: "The deep personality analysis was scarily accurate. It identified patterns in my thinking I never noticed. My new career feels like it was made for me.",
    name: "Aisha Patel",
    role: "Engineering Grad → Product Manager",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-soft mb-4">Success Stories</span>
          <h2 className="section-title mb-4">Lives changed by clarity.</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Hear from professionals who found their true calling using Carevo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="premium-card p-8 flex flex-col h-full"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-6" />
              <p className="text-foreground leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-border"
                />
                <div>
                  <h4 className="font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
