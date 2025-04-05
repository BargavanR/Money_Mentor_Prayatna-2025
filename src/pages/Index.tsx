
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { MessageSquare, BookOpen, TrendingUp, LineChart, User } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Your Smart Guide to <span className="text-primary">Smarter Investing</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          MoneyMentor combines AI-powered advice, educational content, and market insights to help you make confident financial decisions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/chatbot">Ask MoneyMentor</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link to="/literacy">Start Learning</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">How MoneyMentor Helps You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="AI Financial Assistant"
            description="Ask any financial or investment question and get clear, jargon-free explanations."
            icon={<MessageSquare className="h-6 w-6" />}
            to="/chatbot"
          />
          <FeatureCard
            title="Financial Literacy"
            description="Learn investing basics through bite-sized lessons and interactive quizzes."
            icon={<BookOpen className="h-6 w-6" />}
            to="/literacy"
          />
          <FeatureCard
            title="Investment Recommendations"
            description="Get personalized investment suggestions based on your profile and goals."
            icon={<TrendingUp className="h-6 w-6" />}
            to="/recommendations"
          />
          <FeatureCard
            title="Market Insights"
            description="Visualize market trends and data with easy-to-understand charts."
            icon={<LineChart className="h-6 w-6" />}
            to="/insights"
          />
          <FeatureCard
            title="Personalized Profile"
            description="Customize your experience and track your financial learning journey."
            icon={<User className="h-6 w-6" />}
            to="/profile"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-muted rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-muted-foreground">Tell us about your financial goals, risk tolerance, and investment horizon.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Explore and Learn</h3>
            <p className="text-muted-foreground">Use our chatbot, complete lessons, and view market insights to boost your knowledge.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
            <p className="text-muted-foreground">Receive personalized investment ideas tailored to your unique situation.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            MoneyMentor is here to guide you every step of the way with AI-powered insights and jargon-free advice.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/chatbot">Ask Your First Question</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
