import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">
          AI-Assisted App Development: Getting the most out of AI coding tools!
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg">
            Welcome to this hands-on workshop where we&apos;ll explore how AI-powered coding tools are transforming software development, allowing people to move from idea to application faster than ever.
          </p>
          
          <p className="text-lg">
            In this workshop, you&apos;ll:
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Learn about different AI coding tools and their capabilities</li>
            <li>Build a simple web application with AI assistance</li>
            <li>Explore best practices for AI-assisted development</li>
            <li>Discover how to integrate AI tools into your workflow</li>
          </ul>

          <p className="text-lg mt-6">
            Whether you&apos;re new to AI coding or looking to refine your workflow, this session will provide some helpful tips to boost your productivity.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="https://github.com/KomodoHQ/ai-app-development-workshop" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </main>
  )
}
