import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'portfolio';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<'all' | 'services' | 'portfolio'>('all');

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['/api/search', searchQuery, searchType === 'all' ? undefined : searchType],
    enabled: searchQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }) as { data: SearchResult[], isLoading: boolean };

  const handleResultClick = (result: SearchResult) => {
    console.log(`Navigate to ${result.type}: ${result.title}`);
    // TODO: Implement navigation to specific result
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Services & Portfolio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for maritime services, projects, or solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              data-testid="input-search"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchQuery("")}
                data-testid="button-clear-search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Results' },
              { key: 'services', label: 'Services' },
              { key: 'portfolio', label: 'Portfolio' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={searchType === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType(filter.key as any)}
                data-testid={`filter-${filter.key}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {searchQuery.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Type to search our services and portfolio...</p>
              </div>
            ) : isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p>Searching...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords or browse our services directly.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(searchResults as SearchResult[]).map((result: SearchResult) => (
                  <Card 
                    key={result.id}
                    className="cursor-pointer hover-elevate transition-all duration-200"
                    onClick={() => handleResultClick(result)}
                    data-testid={`result-${result.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{result.title}</h3>
                            <Badge 
                              variant={result.type === 'service' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {searchQuery.length === 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'RoRo Operations',
                  'Container Handling',
                  'Heavy Lift',
                  'Ghana Projects',
                  'Port Services'
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(suggestion)}
                    data-testid={`suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}