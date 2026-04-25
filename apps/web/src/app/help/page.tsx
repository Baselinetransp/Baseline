import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function HelpPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground">Help page coming soon...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
