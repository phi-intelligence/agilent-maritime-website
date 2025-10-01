import { useState, useEffect } from "react";
import DynamoDBService, { Contact } from "@/lib/dynamodb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Trash2,
  RefreshCw,
  Home,
  ArrowLeft,
  LogOut
} from "lucide-react";
import { format } from "date-fns";
import { Navigation } from "@/components/Navigation";
import { getAssetUrl, ASSET_PATHS } from "@/utils/assets";

// Contact interface is now imported from dynamodb.ts

export default function Admin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "responded" | "unresponded">("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Simple password authentication
  const ADMIN_PASSWORD = "agilent2024"; // In production, use proper authentication

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchContacts = async () => {
    try {
      const contactsArray = await DynamoDBService.getAllContacts();
      setContacts(contactsArray);
      setFilteredContacts(contactsArray);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsResponded = async (id: string) => {
    try {
      await DynamoDBService.markAsResponded(id);
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error('Error marking as responded:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await DynamoDBService.deleteContact(id);
        fetchContacts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const exportContacts = () => {
    const csvContent = [
      ['Name', 'Email', 'Company', 'Message', 'Date', 'Status'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.company,
        contact.message.replace(/\n/g, ' '),
        format(new Date(contact.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        contact.responded ? 'Responded' : 'Pending'
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = contacts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(contact =>
        statusFilter === "responded" ? contact.responded : !contact.responded
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div 
          className="flex items-center justify-center min-h-screen pt-16 relative"
          style={{
            backgroundImage: `url('${getAssetUrl(ASSET_PATHS.STOCK.WATER)}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <Card className="w-full max-w-md backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl relative z-10">
            <CardHeader>
              <CardTitle className="text-center text-white">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/30"
                  />
                </div>
                <Button type="submit" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div 
        className="min-h-screen relative pt-16"
        style={{
          backgroundImage: `url('${getAssetUrl(ASSET_PATHS.GENERATED.WATER_DROP)}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Water Background Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/90">Manage contact form submissions</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-white/80" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/90">Total Contacts</p>
                  <p className="text-2xl font-bold text-white">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-300" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/90">Responded</p>
                  <p className="text-2xl font-bold text-white">{contacts.filter(c => c.responded).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-orange-300" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/90">Pending</p>
                  <p className="text-2xl font-bold text-white">{contacts.filter(c => !c.responded).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-300" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-white/90">Today</p>
                  <p className="text-2xl font-bold text-white">
                    {contacts.filter(c =>
                      new Date(c.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6 backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/30"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="unresponded">Pending</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchContacts} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportContacts} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Contact Messages ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
                <p className="text-white">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                <p className="text-blue-200">No contacts found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                        <TableHeader>
                          <TableRow className="border-white/20">
                            <TableHead className="text-white/90">Name</TableHead>
                            <TableHead className="text-white/90">Company</TableHead>
                            <TableHead className="text-white/90">Email</TableHead>
                            <TableHead className="text-white/90">Date</TableHead>
                            <TableHead className="text-white/90">Status</TableHead>
                            <TableHead className="text-white/90">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id} className="border-white/20 hover:bg-white/10">
                        <TableCell className="font-medium text-white">{contact.name}</TableCell>
                        <TableCell className="text-white">{contact.company}</TableCell>
                        <TableCell className="text-white">{contact.email}</TableCell>
                        <TableCell className="text-white">
                          {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.responded ? "default" : "secondary"} className={contact.responded ? "bg-green-500/20 text-green-200 border-green-400/30" : "bg-orange-500/20 text-orange-200 border-orange-400/30"}>
                            {contact.responded ? "Responded" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedContact(contact)}
                                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Contact Details</DialogTitle>
                                  <DialogDescription className="text-white/80">
                                    Message from {contact.name} at {contact.company}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-white/70">Name</label>
                                      <p className="text-sm text-white">{contact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-white/70">Company</label>
                                      <p className="text-sm text-white">{contact.company}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-white/70">Email</label>
                                      <p className="text-sm text-white">{contact.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-white/70">Date</label>
                                      <p className="text-sm text-white">
                                        {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-white/70">Message</label>
                                    <div className="mt-2 p-4 bg-white/10 border border-white/20 rounded-md">
                                      <p className="text-sm text-white whitespace-pre-wrap">{contact.message}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {!contact.responded && (
                                      <Button
                                        onClick={() => markAsResponded(contact.id)}
                                        size="sm"
                                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Responded
                                      </Button>
                                    )}
                                    <Button
                                      onClick={() => deleteContact(contact.id)}
                                      variant="destructive"
                                      size="sm"
                                      className="bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30 hover:border-red-400/50"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
