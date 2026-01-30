import { useScrollFade } from "@/hooks/useScrollFade";
import { Star } from "lucide-react";

const repos = [
  { name: "openai-cost-tracker", stars: 1247, language: "Python" },
  { name: "llm-price-calculator", stars: 834, language: "TypeScript" },
  { name: "ai-budget-tracker", stars: 612, language: "JavaScript" },
];

const keywords = ["ai", "subscriptions", "billing", "saas"];

const SampleOpportunity = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-primary-section scroll-fade">
      <div className="container-custom max-w-[800px]">
        <div className="text-center mb-12">
          <h2 className="text-subheadline mb-4">See what's inside</h2>
          <p className="text-body">Real opportunities from the database</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="badge-keyword text-xs">Ask HN</span>
            <span className="text-foreground-muted text-sm">487 points · 234 comments</span>
          </div>

          {/* Title */}
          <h3 className="text-section-header mb-4">
            "How do you manage multiple AI subscriptions?"
          </h3>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            {keywords.map((keyword) => (
              <span key={keyword} className="badge-keyword">
                {keyword}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Matched Repos */}
          <div>
            <h4 className="text-sm font-semibold text-foreground-muted mb-4">
              Matched GitHub Repos
            </h4>
            <div className="space-y-3">
              {repos.map((repo) => (
                <div 
                  key={repo.name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-foreground font-medium">{repo.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-foreground-muted text-sm">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars.toLocaleString()}
                    </span>
                    <span className="badge-keyword text-xs">{repo.language}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-foreground-muted text-sm mt-6">
          Updated weekly with fresh opportunities
        </p>
      </div>
    </section>
  );
};

export default SampleOpportunity;
