import csv
import time
from duckduckgo_search import DDGS

def get_guest_post_targets(queries, max_results_per_query=10):
    """Searches for guest post targets using DDG and returns a list of dictionaries."""
    print(f"Starting search for {len(queries)} queries...")
    results = []
    seen_urls = set()

    with DDGS() as ddgs:
        for query in queries:
            print(f"Searching for: '{query}'")
            try:
                # Get search results
                search_results = list(ddgs.text(query, max_results=max_results_per_query))
                
                for r in search_results:
                    url = r.get('href')
                    if url and url not in seen_urls:
                        seen_urls.add(url)
                        title = r.get('title', 'Unknown Title')
                        
                        results.append({
                            'Website': title,
                            'URL': url,
                            'Niche': 'Health/Wellness',
                            'Email_Template': generate_email_pitch(title)
                        })
                # Be polite to the search engine
                time.sleep(2)
            except Exception as e:
                print(f"Error searching for {query}: {e}")
                
    return results

def generate_email_pitch(website_name):
    """Generates a personalized email pitch for the target website."""
    # Clean up the title a bit for the email
    clean_name = website_name.split('|')[0].split('-')[0].strip()
    if len(clean_name) > 30 or "Write" in clean_name:
        clean_name = "Team"
        
    template = f"""Hi {clean_name},

I was reading your recent articles and absolutely loved the focus on practical wellness and daily health.

I run ErgoWellness (getergowellness.com), a US-based brand focused on clinical-grade ergonomic solutions for desk workers. We are currently expanding our outreach and I noticed you accept guest contributions.

I would love to write a high-quality, free, 1000-word article for your audience. 
Some topic ideas:
1. "The Hidden Cost of Tech-Neck: How Office Posture is Draining Your Energy"
2. "3 Simple Ergonomic Tweaks to Eliminate Lower Back Pain at Work"

I will ensure the content is highly researched, SEO-optimized, and perfectly aligned with your audience. I only ask for a single do-follow link back to our store in the author bio.

Would you be open to one of these topics? 

Best regards,
Bilal
Founder, ErgoWellness
support@getergowellness.com"""
    return template

def save_to_csv(results, filename="target_blogs.csv"):
    """Saves the prospect list and email templates to a CSV file."""
    if not results:
        print("No results found to save.")
        return
        
    keys = results[0].keys()
    with open(filename, 'w', newline='', encoding='utf-8') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(results)
    print(f"Successfully saved {len(results)} target websites to {filename}!")

if __name__ == "__main__":
    # Advanced search operators to find sites accepting guest posts in our exact niche
    search_queries = [
        '"write for us" "health"',
        '"write for us" "wellness"',
        '"write for us" "posture"',
        '"guest post guidelines" "ergonomics"',
        '"submit an article" "back pain"',
        '"contribute to our blog" "office health"'
    ]
    
    print("ErgoWellness SEO Backlink Prospector v1.0")
    print("-----------------------------------------")
    print("This script will find health blogs that accept guest posts.")
    print("You will need to install duckduckgo-search if you haven't already:")
    print("pip install duckduckgo-search")
    print("-----------------------------------------")
    
    targets = get_guest_post_targets(search_queries, max_results_per_query=5)
    save_to_csv(targets, "guest_post_targets.csv")
    
    print("\nNext Steps:")
    print("1. Open guest_post_targets.csv in Excel/Google Sheets.")
    print("2. Visit the URLs to find the editor's actual email address.")
    print("3. Copy the pre-written 'Email_Template' and send it from ergowellness.social@gmail.com")
