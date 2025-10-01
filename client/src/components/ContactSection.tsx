import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Quote, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "./LanguageProvider";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";
import { useState } from "react";
import DynamoDBService from "@/lib/dynamodb";

export function ContactSection() {
  const { content } = useLanguage();
  
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [formRef, isFormVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });
  const [testimonialRef, isTestimonialVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: false });

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const contactData = {
        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        email: formData.get('email') as string,
        company: formData.get('company') as string,
        message: formData.get('message') as string,
      };

      // Save to DynamoDB
      const savedContact = await DynamoDBService.createContact(contactData);
      
      if (savedContact) {
        setSubmitStatus('success');
        // Reset form
        e.currentTarget.reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to save contact information');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-contact">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        loop 
        muted 
        playsInline
      >
            <source src={getAssetUrl(ASSET_PATHS.BACKGROUNDS.SHIP_MOVEMENT)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-fade-in-up ${isHeaderVisible ? 'animate-visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.contact?.title || "Get in Touch"}
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            {content.contact?.subtitle || "Ready to optimize your maritime operations? Contact us today to discuss your stevedoring and terminal service needs."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`animate-fade-in-up ${isFormVisible ? 'animate-visible' : ''}`}
          >
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{content.contact?.form?.firstName || "First name"}</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{content.contact?.form?.lastName || "Last name"}</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">{content.contact?.form?.company || "Company"}</Label>
                    <Input id="company" name="company" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{content.contact?.form?.email || "Email"}</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{content.contact?.form?.message || "Message"}</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      required 
                      placeholder={content.contact?.form?.messagePlaceholder || "Tell us about your maritime logistics needs..."}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {(content.contact?.form as any)?.submitting || "Sending..."}
                      </>
                    ) : (
                      content.contact?.form?.submit || "Send Message"
                    )}
                  </Button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span>{(content.contact?.form as any)?.success || "Thank you! Your message has been sent successfully."}</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                      <AlertCircle className="h-5 w-5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <div 
            ref={testimonialRef}
            className={`animate-fade-in-up ${isTestimonialVisible ? 'animate-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <Card className="h-full">
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <Quote className="w-12 h-12 text-primary mb-6" />
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8">
                  "{content.contact?.testimonial?.quote || "At our core, we believe every cargo movement tells a story of trust. Our customers aren't just clients—they're partners whose success defines our purpose. In stevedoring, there's no room for compromise on safety or service. When we handle their vessels, we're handling their reputation, their commitments, and their future. Our customers trust us with their most valuable assets, and we honor that trust with precision, care, and an unwavering commitment to operational excellence in every port we serve."}"
                </blockquote>
                <div className="border-t pt-6">
                  <div className="flex items-center gap-4">
                        <img 
                          src={getAssetUrl(ASSET_PATHS.TEAM.KOFI_WEBB)} 
                          alt={`${content.contact?.testimonial?.name || "Kofi Mitchell Webb"} - ${content.contact?.testimonial?.title || "Managing Director"}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {content.contact?.testimonial?.name || "Kofi Mitchell Webb"}
                      </div>
                      <div className="text-muted-foreground">
                        {content.contact?.testimonial?.title || "Managing Director"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}