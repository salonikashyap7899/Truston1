# Admin Content Management System - Implementation Guide

## Overview
Your admin panel now has **real-time content updates**. When an admin changes anything (headings, images, video URLs), the website instantly updates without requiring a page refresh.

---

## How It Works Now

### Before (❌ Not Working)
1. Admin edits content in admin panel
2. Changes save to database ✓
3. Website cache still has old data ✗
4. Website shows old content (nothing changes) ✗

### After (✅ Now Working)
1. Admin edits content in admin panel
2. Changes save to database ✓
3. Real-time subscription triggers ✓
4. Website receives update instantly ✓
5. Website displays new content in real-time ✓

---

## Technical Implementation

### Updated Component: `usePageContent` Hook

**File:** `src/hooks/usePageContent.ts`

The hook now includes:
- ✅ Initial data fetch from Supabase
- ✅ Real-time subscription to database changes
- ✅ Automatic state updates when content changes
- ✅ Proper cleanup on component unmount

```typescript
export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(cache.get(key) ?? fallback);

  useEffect(() => {
    // 1. Fetch initial data
    const fetchData = async () => { ... };
    fetchData();

    // 2. Subscribe to real-time updates
    const subscription = supabase
      .channel(`content:${key}`)
      .on('postgres_changes', ...)
      .subscribe();

    // 3. Cleanup
    return () => { ... };
  }, [key]);

  return data;
}
```

---

## Content Keys Available

Your admin panel manages these content blocks:

| Key | Label | Purpose |
|-----|-------|---------|
| `home.hero` | Home — Hero | Homepage hero section (heading, subtitle, video) |
| `about.hero` | About — Hero | About page hero section |
| `contact.hero` | Contact — Hero | Contact page hero section |
| `services.hero` | Services — Hero | Services page hero section |
| `project.hero` | Projects — Hero | Projects page hero section |
| `partner.hero` | Channel Partner — Hero | Partner page hero section |
| `site.settings` | Site Settings | Global settings (phone, email, address, etc.) |

---

## How to Use the Admin Panel

### 1. Access Admin Panel
- Go to `https://yourdomain.com/admin`
- Log in with your admin credentials

### 2. Edit Content
- Click on a content block (e.g., "Home — Hero")
- Edit fields:
  - **eyebrow**: Small header text above main title
  - **title**: Main heading
  - **title_accent**: Highlighted accent text
  - **subtitle**: Subheading text
  - **image_url**: URL to an image
  - **video_url**: URL to a video (mp4, webm, mov)

### 3. Save Changes
- Click the **"Update Asset"** button
- You'll see: "Empire architecture updated"
- Changes apply instantly to the website

### 4. See Changes Live
- Open your website in another browser tab
- Watch the content update in real-time
- No page refresh needed!

---

## Real-Time Updates Explained

### How the Subscription Works

When you save an update in the admin panel:

```javascript
// Admin saves
await supabase
  .from("site_content")
  .update({ data: draft })
  .eq("id", current.id);

// Supabase triggers a real-time event
// Your website's subscription receives it:
.on('postgres_changes', {
  event: "*",
  schema: "public",
  table: "site_content",
  filter: `key=eq.${key}`,
}, (payload) => {
  // Update React state automatically
  setData(payload.new.data);
})
```

---

## Database Schema

**Table:** `site_content`

```sql
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY,
  key text NOT NULL UNIQUE,           -- e.g., "home.hero"
  label text NOT NULL,                -- e.g., "Home — Hero"
  data jsonb NOT NULL DEFAULT '{}',   -- e.g., {title: "...", subtitle: "..."}
  created_at timestamptz,
  updated_at timestamptz
);
```

The `data` column stores JSON with flexible fields:
```json
{
  "eyebrow": "TRUSTON",
  "title": "Build Your Legacy",
  "title_accent": "",
  "subtitle": "Premium Estate",
  "image_url": "https://...",
  "video_url": "https://example.com/video.mp4"
}
```

---

## Testing the System

### Test Case 1: Update a Heading
1. Open admin panel and home page side-by-side
2. Go to admin → "Home — Hero"
3. Change the `title` field to something new
4. Click "Update Asset"
5. Watch the homepage update instantly ✓

### Test Case 2: Update a Video
1. In admin panel, select "Home — Hero"
2. Paste a new video URL in `video_url` field
3. Click "Update Asset"
4. Homepage video updates instantly ✓

### Test Case 3: Update Global Settings
1. Select "Site Settings"
2. Change phone, email, or address
3. Click "Update Asset"
4. Any pages using these settings update instantly ✓

---

## Using Content in Your Pages

### Example: Home Page
```typescript
import { usePageContent } from "@/hooks/usePageContent";

export function Index() {
  // Fetch content - auto-updates when admin changes it
  const heroContent = usePageContent("home.hero", {});

  return (
    <>
      <h1>{heroContent.title}</h1>
      <p>{heroContent.subtitle}</p>
      {heroContent.video_url && (
        <video src={heroContent.video_url} />
      )}
      {heroContent.image_url && (
        <img src={heroContent.image_url} alt="hero" />
      )}
    </>
  );
}
```

### Example: Site Settings
```typescript
export function Footer() {
  const settings = usePageContent("site.settings", {});

  return (
    <footer>
      <p>Phone: {settings.phone}</p>
      <p>Email: {settings.email}</p>
    </footer>
  );
}
```

---

## Adding New Content Blocks

### From Admin Panel
1. Go to Admin → Content tab
2. Click "New Schema Property"
3. Enter the field name (e.g., `hero_image_alt`)
4. Click "Append"
5. Fill in the value and save

### In Your Code
```typescript
const content = usePageContent("home.hero", {});
console.log(content.your_new_field); // Access it immediately
```

---

## Troubleshooting

### Issue: Changes not appearing
- **Check 1:** Is Supabase real-time enabled? (Usually enabled by default)
- **Check 2:** Is the admin panel saving successfully? (You should see "Empire architecture updated")
- **Check 3:** Are you using the correct content key in your page?
- **Check 4:** Try hard-refreshing your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Real-time subscription not connecting
- Check your Supabase API key is set correctly
- Verify the `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- Check browser console for errors

### Issue: Admin panel won't load
- Verify you're logged in
- Check that your user has admin role in the database
- Check browser console for errors

---

## Performance Notes

- ✅ **Caching:** Content is cached locally to avoid unnecessary refetches
- ✅ **Real-time:** Updates arrive instantly via Supabase subscriptions
- ✅ **Efficient:** Only subscribed content keys update (not all content)
- ✅ **Memory:** Subscriptions are cleaned up when components unmount

---

## Environment Variables Required

Make sure these are set in your Vercel environment:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

These are already configured since Supabase is integrated.

---

## Next Steps

1. **Test the System:** Follow the testing examples above
2. **Create More Content Blocks:** Add new keys to `site_content` table as needed
3. **Build New Pages:** Use `usePageContent` in new pages and components
4. **Deploy:** Push changes and enjoy real-time admin updates on production

---

## Questions?

Check:
- `src/hooks/usePageContent.ts` - The hook implementation
- `src/routes/admin.index.tsx` - The admin panel UI
- `supabase/migrations/20260518042156_aa7d4950-6f74-4dd6-bf91-080ce7c2c9d8.sql` - Database schema
