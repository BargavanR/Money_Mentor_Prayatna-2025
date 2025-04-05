import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, TrendingUp, TrendingDown, Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  riskLevel: z.string({
    required_error: "Please select a risk level",
  }),
  sector: z.string({
    required_error: "Please select a sector",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface StockRecommendation {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  recommendation: "Buy" | "Sell" | "Hold";
  riskLevel: "Low" | "Medium" | "High";
  potentialReturn: string;
  rationale: string;
}

const Recommendations = () => {
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskLevel: "",
      sector: "",
    },
  });

  // Stock recommendations database (mock data)
  const stockDatabase: StockRecommendation[] = [
    // Technology Sector
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      sector: "Technology",
      price: 189.56,
      recommendation: "Buy",
      riskLevel: "Low",
      potentialReturn: "8-12%",
      rationale: "Strong market position, consistent revenue growth, and healthy cash reserves."
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      sector: "Technology",
      price: 405.23,
      recommendation: "Buy",
      riskLevel: "Low",
      potentialReturn: "10-15%",
      rationale: "Cloud business expansion and enterprise software dominance."
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      sector: "Technology",
      price: 946.25,
      recommendation: "Hold",
      riskLevel: "Medium",
      potentialReturn: "5-20%",
      rationale: "Strong AI chip market position but high valuation concerns."
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      sector: "Technology",
      price: 468.23,
      recommendation: "Buy",
      riskLevel: "Medium",
      potentialReturn: "12-18%",
      rationale: "Recovering ad revenue and strategic investments in AI and metaverse."
    },
    {
      symbol: "PLTR",
      name: "Palantir Technologies",
      sector: "Technology",
      price: 23.45,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "15-25%",
      rationale: "Growing government contracts and expansion into commercial sector."
    },
    // Financial Sector
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      sector: "Financial",
      price: 198.35,
      recommendation: "Buy",
      riskLevel: "Low",
      potentialReturn: "7-10%",
      rationale: "Strong balance sheet and leading position in investment banking."
    },
    {
      symbol: "BAC",
      name: "Bank of America Corp.",
      sector: "Financial",
      price: 38.75,
      recommendation: "Hold",
      riskLevel: "Medium",
      potentialReturn: "5-9%",
      rationale: "Interest rate sensitivity but solid consumer banking operations."
    },
    {
      symbol: "GS",
      name: "Goldman Sachs Group",
      sector: "Financial",
      price: 456.78,
      recommendation: "Buy",
      riskLevel: "Medium",
      potentialReturn: "8-14%",
      rationale: "Strong investment banking division and growing consumer business."
    },
    {
      symbol: "SQ",
      name: "Block Inc.",
      sector: "Financial",
      price: 78.25,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "15-25%",
      rationale: "Innovative payment solutions and growing Cash App ecosystem."
    },
    {
      symbol: "SOFI",
      name: "SoFi Technologies",
      sector: "Financial",
      price: 7.82,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "20-40%",
      rationale: "Growth in user base and expanding financial service offerings."
    },
    // Healthcare Sector
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      sector: "Healthcare",
      price: 152.30,
      recommendation: "Buy",
      riskLevel: "Low",
      potentialReturn: "6-9%",
      rationale: "Stable dividend growth and diverse healthcare product portfolio."
    },
    {
      symbol: "PFE",
      name: "Pfizer Inc.",
      sector: "Healthcare",
      price: 27.45,
      recommendation: "Sell",
      riskLevel: "Medium",
      potentialReturn: "-5-8%",
      rationale: "Declining COVID-19 vaccine revenue and patent cliff concerns."
    },
    {
      symbol: "MRNA",
      name: "Moderna Inc.",
      sector: "Healthcare",
      price: 109.65,
      recommendation: "Hold",
      riskLevel: "High",
      potentialReturn: "-10-20%",
      rationale: "Promising mRNA pipeline but uncertainty in post-COVID revenue streams."
    },
    {
      symbol: "GILD",
      name: "Gilead Sciences",
      sector: "Healthcare",
      price: 73.25,
      recommendation: "Buy",
      riskLevel: "Medium",
      potentialReturn: "8-12%",
      rationale: "Strong HIV drug portfolio and expanding oncology pipeline."
    },
    {
      symbol: "CRSP",
      name: "CRISPR Therapeutics",
      sector: "Healthcare",
      price: 58.90,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "25-60%",
      rationale: "Leading gene-editing technology with potential breakthrough treatments."
    },
    // Energy Sector
    {
      symbol: "XOM",
      name: "Exxon Mobil Corp.",
      sector: "Energy",
      price: 118.95,
      recommendation: "Hold",
      riskLevel: "Medium",
      potentialReturn: "4-8%",
      rationale: "Strong dividend yield but long-term energy transition challenges."
    },
    {
      symbol: "CVX",
      name: "Chevron Corp.",
      sector: "Energy",
      price: 154.25,
      recommendation: "Buy",
      riskLevel: "Low",
      potentialReturn: "7-11%",
      rationale: "Reliable dividend and balanced portfolio of oil and gas assets."
    },
    {
      symbol: "ENPH",
      name: "Enphase Energy",
      sector: "Energy",
      price: 110.50,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "15-30%",
      rationale: "Leading position in solar microinverters and growing energy storage business."
    },
    {
      symbol: "FSLR",
      name: "First Solar Inc.",
      sector: "Energy",
      price: 175.60,
      recommendation: "Buy",
      riskLevel: "High",
      potentialReturn: "12-20%",
      rationale: "Benefiting from clean energy incentives and domestic manufacturing advantages."
    },
    {
      symbol: "BP",
      name: "BP p.l.c.",
      sector: "Energy",
      price: 35.65,
      recommendation: "Sell",
      riskLevel: "Medium",
      potentialReturn: "-3-7%",
      rationale: "Challenging transition to renewable energy and competitive pressures in fossil fuels."
    }
  ];

  const getRecommendations = (data: FormValues): StockRecommendation[] => {
    const { riskLevel, sector } = data;
    
    // Filter stocks based on user selections
    let filteredStocks = stockDatabase;
    
    // Filter by sector if specified
    if (sector && sector !== "all") {
      filteredStocks = filteredStocks.filter(stock => stock.sector === sector);
    }
    
    // Filter by risk level if specified
    if (riskLevel && riskLevel !== "all") {
      const riskMap: Record<string, "Low" | "Medium" | "High"> = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
      };
      
      filteredStocks = filteredStocks.filter(stock => stock.riskLevel === riskMap[riskLevel]);
    }
    
    // Return up to 10 stocks
    return filteredStocks.slice(0, 10);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = getRecommendations(data);
      
      if (results.length === 0) {
        toast({
          title: "No recommendations found",
          description: "Try different criteria to see stock recommendations.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      setRecommendations(results);
      setShowResults(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Stock Recommendations</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized stock recommendations based on your risk tolerance and preferred sector.
        </p>
      </div>

      {!showResults ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Select Your Criteria</CardTitle>
            <CardDescription>
              Choose your risk level and sector of interest to receive stock recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="riskLevel"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Risk Level</FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Low: Conservative investments with lower potential returns</p>
                                <p>Medium: Balanced investments with moderate risk and returns</p>
                                <p>High: Aggressive investments with higher potential returns and risk</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Risk Levels</SelectItem>
                              <SelectItem value="low">Low Risk</SelectItem>
                              <SelectItem value="medium">Medium Risk</SelectItem>
                              <SelectItem value="high">High Risk</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Your comfort level with investment volatility.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Market Sector</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select market sector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Sectors</SelectItem>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Financial">Financial</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Energy">Energy</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Industry sector you're interested in investing.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Finding Recommendations..." : "Get Stock Recommendations"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Back to Form
            </Button>
            <h2 className="text-2xl font-bold">Stock Recommendations</h2>
            <div className="w-[100px]"></div> {/* Empty div for flex spacing */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((stock) => (
              <Card key={stock.symbol} className={`border-l-4 ${
                stock.recommendation === "Buy" 
                  ? "border-l-green-500" 
                  : stock.recommendation === "Sell"
                  ? "border-l-red-500"
                  : "border-l-yellow-500"
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{stock.symbol}</CardTitle>
                        <Badge variant={
                          stock.recommendation === "Buy" 
                            ? "default" 
                            : stock.recommendation === "Sell"
                            ? "destructive"
                            : "outline"
                        }>
                          {stock.recommendation}
                        </Badge>
                      </div>
                      <CardDescription className="text-base font-medium">{stock.name}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${stock.price.toFixed(2)}</p>
                      <Badge variant="outline">{stock.sector}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className={`font-medium ${
                      stock.riskLevel === "Low" 
                        ? "text-green-600" 
                        : stock.riskLevel === "Medium"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}>
                      {stock.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Return:</span>
                    <span className="font-medium">{stock.potentialReturn}</span>
                  </div>
                  <Separator />
                  <div className="text-sm">
                    <p className="text-muted-foreground font-medium mb-1">Analysis:</p>
                    <p>{stock.rationale}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`https://finance.yahoo.com/quote/${stock.symbol}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      Research <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="bg-muted/50 border-muted mt-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> These recommendations are provided for informational purposes only and do not constitute financial advice. 
                  Always conduct your own research or consult with a qualified financial advisor before making investment decisions. 
                  Past performance is not indicative of future results.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
