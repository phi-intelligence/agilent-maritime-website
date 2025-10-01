import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

interface StaticContactFormProps {
  content: any; // Language content
}

export function StaticContactForm({ content }: StaticContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Option 1: Use Formspree (recommended)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: 'New Contact Form Submission - Agilent Maritime',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Failed to Send Message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+233-30-202-1234", "VHF Channel 16"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@agilentmaritime.com", "operations@agilentmaritime.com"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Tema Port", "Greater Accra, Ghana"],
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            {content.contact?.form?.title || "Send us a Message"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  {content.contact?.form?.firstName || "Name"} *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  {content.contact?.form?.email || "Email"} *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                {content.contact?.form?.company || "Company"}
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                {content.contact?.form?.message || "Message"} *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                placeholder={content.contact?.form?.messagePlaceholder || "Tell us about your maritime needs..."}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isSubmitting 
                ? "Sending..." 
                : content.contact?.form?.submit || "Send Message"
              }
            </Button>

            {submitStatus === 'success' && (
              <div className="text-green-400 text-sm text-center">
                ✅ Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-400 text-sm text-center">
                ❌ Failed to send message. Please try again.
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {content.contact?.title || "Get in Touch"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <info.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-white/80">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-white/80">
              <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
              <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
              <p><strong>Sunday:</strong> Closed</p>
              <p className="text-blue-400 mt-4">
                <strong>Emergency Services:</strong> 24/7 Available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

