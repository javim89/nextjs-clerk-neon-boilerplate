import { TaskTable } from "@/components/tasks/TaskTable";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Step, CodeBlock, Callout, LinkButton } from "@/components/ui/documentation";
import { Database, Shield, Code, Terminal, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">

          {/* Documentation Section */}
          <div className="max-w-4xl mx-auto mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                🚀 Quick Setup Guide
              </h2>
              <p className="text-gray-600 text-lg">
                Get your Boilerplate app running in minutes with this step-by-step guide
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-8">
              <Step
                number={1}
                title="Clone & Install Dependencies"
                icon={<Code className="h-5 w-5 text-blue-600" />}
              >
                <p className="mb-4">
                  Start by cloning the repository and installing the required dependencies:
                </p>
                <CodeBlock language="bash">
                  {`git clone https://github.com/javim89/nextjs-clerk-neon-boilerplate.git
cd nextjs-clerk-neon-boilerplate
pnpm install`}
                </CodeBlock>
              </Step>

              <Step
                number={2}
                title="Set up Neon Database"
                icon={<Database className="h-5 w-5 text-green-600" />}
              >
                <p className="mb-4">
                  Create your PostgreSQL database with Neon's serverless platform:
                </p>
                <div className="space-y-4">
                  <div>
                    <LinkButton href="https://neon.tech">
                      Create Neon Account
                    </LinkButton>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>Sign up for a free Neon account</li>
                    <li>Create a new project</li>
                    <li>Copy the connection string from your dashboard</li>
                    <li>Add it to your environment variables (next step)</li>
                  </ol>
                </div>
                <Callout type="info" title="Pro Tip">
                  Neon provides a generous free tier perfect for development and small projects!
                </Callout>
              </Step>

              <Step
                number={3}
                title="Configure Clerk Authentication"
                icon={<Shield className="h-5 w-5 text-purple-600" />}
              >
                <p className="mb-4">
                  Set up secure authentication with Clerk:
                </p>
                <div className="space-y-4">
                  <div>
                    <LinkButton href="https://clerk.com">
                      Create Clerk Account
                    </LinkButton>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>Sign up for a Clerk account</li>
                    <li>Create a new application</li>
                    <li>Go to the API Keys section</li>
                    <li>Copy your Publishable Key and Secret Key</li>
                    <li>Configure your authentication settings (optional)</li>
                  </ol>
                </div>
              </Step>

              <Step
                number={4}
                title="Environment Variables Setup"
                icon={<Settings className="h-5 w-5 text-orange-600" />}
              >
                <p className="mb-4">
                  Create your environment files with the required variables:
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Create <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env.local</code> file:</h4>
                  <CodeBlock filename=".env.local">
                    {`# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Neon Database
DATABASE_URL=your_neon_database_connection_string_here`}
                  </CodeBlock>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Create <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env</code> file:</h4>
                  <CodeBlock filename=".env">
                    {`# Production Database (same as DATABASE_URL in .env.local)
DATABASE_URL=your_neon_database_connection_string_here`}
                  </CodeBlock>
                </div>

                <Callout type="warning" title="Important">
                  Never commit your <code>.env.local</code> or <code>.env</code> files to version control. They contain sensitive information!
                </Callout>
              </Step>

              <Step
                number={5}
                title="Database Migration with Prisma"
                icon={<Database className="h-5 w-5 text-indigo-600" />}
              >
                <p className="mb-4">
                  Initialize your database with Prisma ORM and create the required tables:
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Generate Prisma Client:</h4>
                  <CodeBlock language="bash">
                    {`# Generate the Prisma client
npx prisma generate`}
                  </CodeBlock>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Run Database Migration:</h4>
                  <CodeBlock language="bash">
                    {`# Using the npm script (recommended)
npm run migrate

# Or manually with Prisma CLI:
npx prisma migrate dev --name init`}
                  </CodeBlock>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Optional - View your database:</h4>
                  <CodeBlock language="bash">
                    {`# Open Prisma Studio to view/edit data
npx prisma studio`}
                  </CodeBlock>
                  <p className="text-sm text-gray-600 mt-2">
                    This opens a web interface at <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">http://localhost:5555</code> to manage your data visually.
                  </p>
                </div>

                <Callout type="info" title="About Prisma">
                  Prisma is a next-generation ORM that provides type-safe database access, automatic migrations, and a powerful query builder. It's already configured in this project to work seamlessly with Neon PostgreSQL.
                </Callout>
              </Step>

              <Step
                number={6}
                title="Start Development Server"
                icon={<Terminal className="h-5 w-5 text-blue-600" />}
              >
                <p className="mb-4">
                  You're ready to go! Start the development server:
                </p>
                <CodeBlock language="bash">
                  {`npm run dev`}
                </CodeBlock>
                <p className="mt-3">
                  Open <a href="http://localhost:3000" className="text-blue-600 hover:underline font-medium">http://localhost:3000</a> in your browser and start managing your tasks!
                </p>
              </Step>

              <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🎉 You're All Set!</h3>
                    <p className="text-gray-700 mb-4">
                      Your Boilerplate application is now ready to use. You can sign up, create tasks, and start organizing your productivity workflow.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <LinkButton href="https://docs.neon.tech" external>
                        Neon Docs
                      </LinkButton>
                      <LinkButton href="https://clerk.com/docs" external>
                        Clerk Docs
                      </LinkButton>
                      <LinkButton href="https://nextjs.org/docs" external>
                        Next.js Docs
                      </LinkButton>
                      <LinkButton href="https://prisma.io/docs" external>
                        Prisma Docs
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Your Tasks
              </h1>
              <p className="text-gray-600 text-lg">Stay organized and productive with your personal task manager</p>
            </div>
            <TaskTable />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
