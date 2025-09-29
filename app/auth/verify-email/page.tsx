import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
            <CardDescription className="text-gray-300">We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Please check your email and click the verification link to complete your account setup.
            </p>
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or try signing up again.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
