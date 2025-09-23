import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, Download, Calendar, TrendingUp, Shield, 
  Leaf, Users, Award, ArrowRight 
} from "lucide-react";

const reportCategories = [
  {
    icon: FileText,
    title: "Annual Reports",
    description: "Comprehensive yearly performance and financial reports",
    reports: [
      { title: "Annual Report 2023", date: "March 2024", size: "2.5 MB" },
      { title: "Annual Report 2022", date: "March 2023", size: "2.1 MB" },
      { title: "Annual Report 2021", date: "March 2022", size: "1.9 MB" }
    ]
  },
  {
    icon: TrendingUp,
    title: "Quarterly Updates",
    description: "Regular operational highlights and performance metrics",
    reports: [
      { title: "Q3 2024 Performance Update", date: "October 2024", size: "1.2 MB" },
      { title: "Q2 2024 Operations Review", date: "July 2024", size: "1.1 MB" },
      { title: "Q1 2024 Financial Summary", date: "April 2024", size: "1.0 MB" }
    ]
  },
  {
    icon: Leaf,
    title: "Sustainability Reports",
    description: "Environmental initiatives and ESG compliance documentation",
    reports: [
      { title: "Sustainability Report 2023", date: "June 2024", size: "3.2 MB" },
      { title: "Environmental Impact Assessment", date: "January 2024", size: "2.8 MB" },
      { title: "Carbon Footprint Analysis 2023", date: "March 2024", size: "1.5 MB" }
    ]
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Safety records, incident reporting, and regulatory compliance",
    reports: [
      { title: "Safety Performance 2023", date: "February 2024", size: "2.0 MB" },
      { title: "HSSEQ Management Review", date: "December 2023", size: "1.8 MB" },
      { title: "Port State Control Report", date: "November 2023", size: "1.2 MB" }
    ]
  }
];

const keyMetrics = [
  { icon: Users, label: "Vehicles Handled", value: "425,000", period: "2023" },
  { icon: TrendingUp, label: "Revenue Growth", value: "18%", period: "YoY" },
  { icon: Shield, label: "Safety Score", value: "99.8%", period: "2023" },
  { icon: Award, label: "Client Satisfaction", value: "96%", period: "2023" }
];

export default function Reports() {
  const handleDownloadReport = (reportTitle: string) => {
    console.log(`Download report: ${reportTitle}`);
    // TODO: Implement actual file download
    alert(`Downloading ${reportTitle}...`);
  };

  const handleSubscribeUpdates = () => {
    console.log('Subscribe to updates clicked');
    // TODO: Open subscription form
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-reports">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-chart-1/10 via-background to-chart-4/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 backdrop-blur-sm bg-background/80">
            📊 Performance & Transparency
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Reports & Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our latest financial reports, sustainability initiatives, safety records, 
            and operational performance metrics.
          </p>
        </div>
      </section>

      <main className="pb-8">
        {/* Key Metrics */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Key Performance Indicators
              </h2>
              <p className="text-muted-foreground">
                Latest metrics showcasing our operational excellence and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card 
                  key={index}
                  className="text-center backdrop-blur-sm bg-card/80 border-border/50"
                  data-testid={`card-metric-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                      <metric.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="font-semibold text-foreground">{metric.label}</div>
                    <div className="text-sm text-muted-foreground">{metric.period}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Report Categories */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Available Reports
              </h2>
              <p className="text-muted-foreground">
                Download our latest reports and documentation for detailed insights.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {reportCategories.map((category, index) => (
                <Card 
                  key={index}
                  className="backdrop-blur-sm bg-card/80 border-border/50"
                  data-testid={`card-report-category-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.reports.map((report, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover-elevate"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{report.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {report.date}
                            </span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => handleDownloadReport(report.title)}
                          data-testid={`button-download-${i}`}
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency Statement */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Our Commitment to Transparency
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  At Agilent Maritime, we believe in complete transparency with our stakeholders. 
                  Our reports provide comprehensive insights into our financial performance, 
                  environmental impact, safety records, and operational excellence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    "Audited Financial Statements",
                    "Third-party Safety Certifications", 
                    "Environmental Impact Assessments"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 justify-center">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={handleSubscribeUpdates}
                  data-testid="button-subscribe-updates"
                >
                  Subscribe to Updates
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Archive Notice */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Need Historical Reports?
            </h3>
            <p className="text-muted-foreground mb-6">
              For reports older than 3 years or specific documentation, please contact our team.
            </p>
            <Button variant="outline" data-testid="button-contact-archives">
              Contact for Archives
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}