import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
                CA
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                CareerAI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              AI-powered personalized career guidance platform for students and professionals. Find the path you were built for.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/assess" className="text-sm text-muted-foreground hover:text-primary transition-colors">Assessment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social links placeholders */}
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
