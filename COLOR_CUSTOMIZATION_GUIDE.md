# Template Color Customization Feature

## Overview

Users can now customize the colors of their selected wedding invitation template. This feature allows couples to match their invitation colors to their wedding theme.

## Features Implemented

### 1. **Color Picker Modal** (`components/ColorCustomizationModal.tsx`)
- Interactive color picker using `react-colorful`
- Three customizable colors: Primary, Secondary, and Accent
- Live preview of changes
- Reset to default template colors
- Save and cancel options

### 2. **Updated Templates Page** (`app/dashboard/templates/page.tsx`)
- "Customize Colors" button added
- Shows current template with color swatches
- Displays "Customized" badge when colors are modified
- Saves both `templateId` and `customColors` to backend

### 3. **Enhanced InviteCard Component** (`components/InviteCard.tsx`)
- Accepts optional `customColors` prop
- Falls back to template default colors if no customization
- Applies custom colors to:
  - Border top accent
  - Couple names
  - Divider lines
  - Icons (calendar, clock, map pin)
  - Background gradients (if image present)

### 4. **Updated Invitation Pages**
- Both subdomain pages now pass `customColors` to InviteCard
- Mock data includes `customColors` field (undefined by default)

## How It Works

### User Flow

1. **Select Template**
   - User goes to `/dashboard/templates`
   - Clicks on a template to select it

2. **Customize Colors**
   - Clicks "Customize Colors" button
   - Modal opens with color pickers for Primary, Secondary, and Accent colors
   - Changes reflect in real-time preview
   - Can reset to template defaults
   - Saves changes

3. **Save Wedding**
   - Clicks "Save Changes" to save template + custom colors
   - Backend receives:
     ```json
     {
       "templateId": "elegant-rose",
       "customColors": {
         "primary": "#ff6b9d",
         "secondary": "#00b8d4",
         "accent": "#fff59d"
       }
     }
     ```

4. **View Invitation**
   - Public invitation page uses custom colors if set
   - Falls back to template defaults if not customized

### Data Flow

```typescript
// Frontend State (Templates Page)
{
  selectedTemplate: "elegant-rose",
  customColors: {
    primary: "#ff6b9d",
    secondary: "#00b8d4",
    accent: "#fff59d"
  }
}

// API Call to NestJS Backend
PUT /api/wedding/:id
{
  templateId: "elegant-rose",
  customColors: { primary: "...", secondary: "...", accent: "..." }
}

// Backend Database (Wedding Entity)
@Column({ type: 'json', nullable: true })
customColors?: {
  primary: string;
  secondary: string;
  accent: string;
};

// Public Invitation Page
GET /api/wedding/:subdomain
// Returns wedding with customColors
// InviteCard component applies custom colors
```

## Backend Integration Required

### 1. Update Wedding Entity (NestJS)

```typescript
// wedding.entity.ts
@Entity()
export class Wedding {
  // ... existing fields
  
  @Column()
  templateId: string;
  
  @Column({ type: 'json', nullable: true })
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}
```

### 2. Update Wedding DTOs

```typescript
// create-wedding.dto.ts
export class CreateWeddingDto {
  // ... existing fields
  
  @IsString()
  templateId: string;
  
  @IsOptional()
  @IsObject()
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// update-wedding.dto.ts
export class UpdateWeddingDto extends PartialType(CreateWeddingDto) {}
```

### 3. Update Wedding Service

```typescript
// wedding.service.ts
async update(id: string, updateWeddingDto: UpdateWeddingDto) {
  const wedding = await this.weddingRepository.findOne({ where: { id } });
  
  if (!wedding) {
    throw new NotFoundException('Wedding not found');
  }
  
  // Update fields including templateId and customColors
  Object.assign(wedding, updateWeddingDto);
  
  return this.weddingRepository.save(wedding);
}

async findBySubdomain(subdomain: string) {
  const wedding = await this.weddingRepository.findOne({ 
    where: { subdomain } 
  });
  
  if (!wedding) {
    throw new NotFoundException('Wedding not found');
  }
  
  // Returns wedding with customColors if set
  return wedding;
}
```

### 4. Frontend API Call (Already in Code)

In `app/dashboard/templates/page.tsx`, update the `handleSave` function:

```typescript
const handleSave = async () => {
  setIsSaving(true);
  try {
    await apiHelpers.updateWedding(weddingId, {
      templateId: selectedTemplate,
      customColors: customColors
    });
    // Show success toast
  } catch (error) {
    // Show error toast
  } finally {
    setIsSaving(false);
  }
};
```

## Testing

### Manual Testing Steps

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Go to Templates Page**
   - Navigate to `http://localhost:3000/dashboard/templates`

3. **Select a Template**
   - Click on any template card

4. **Customize Colors**
   - Click "Customize Colors" button
   - Change Primary color (click color box, use picker)
   - Change Secondary color
   - Change Accent color
   - Watch live preview update
   - Try "Reset to Default" button
   - Click "Save Colors"

5. **Save Template**
   - Click "Save Changes" in main page
   - Check browser console for saved data

6. **View Public Invitation** (After Backend Integration)
   - Go to `http://yoursubdomain.localhost:3000`
   - Verify custom colors are applied

### Expected Behavior

✅ Color picker opens when clicking color boxes
✅ Changes reflect immediately in preview
✅ Reset button restores template defaults
✅ "Customized" badge appears when colors are modified
✅ Save button saves both template and colors
✅ Public invitation uses custom colors

## Color Customization Tips for Users

### Choosing Good Color Combinations

1. **Primary Color**: Main wedding theme color (flowers, decorations)
2. **Secondary Color**: Complementary darker shade (text, accents)
3. **Accent Color**: Light background or highlight color

### Suggested Palettes

- **Romantic Pink**: `#ff6b9d`, `#8b0045`, `#fff0f5`
- **Ocean Blue**: `#00b8d4`, `#004d6b`, `#e0f7fa`
- **Forest Green**: `#4caf50`, `#1b5e20`, `#f1f8e9`
- **Sunset Orange**: `#ff9800`, `#e65100`, `#fff3e0`
- **Royal Purple**: `#9c27b0`, `#4a148c`, `#f3e5f5`

## Future Enhancements

### Phase 2 Features (Not Implemented)

- [ ] Font customization
- [ ] Layout editor (drag & drop components)
- [ ] Background image upload
- [ ] Text content customization
- [ ] Add/remove invitation sections
- [ ] Animation effects
- [ ] Multiple color themes (light/dark mode)
- [ ] AI-powered color suggestions
- [ ] Import colors from uploaded photo

### Phase 3 Features (Advanced)

- [ ] Per-guest template customization
- [ ] Template marketplace
- [ ] Custom CSS editor for advanced users
- [ ] Template preview in different screen sizes
- [ ] A/B testing different templates

## Technical Notes

- **Library Used**: `react-colorful` (3KB, fast, touch-friendly)
- **Color Format**: Hex colors (`#RRGGBB`)
- **Storage**: JSON column in database (nullable)
- **Fallback**: Always falls back to template defaults if `customColors` is null/undefined
- **Performance**: Colors applied via inline styles (no CSS generation overhead)

## Troubleshooting

### Colors Not Appearing on Public Page
- Check if `customColors` is returned from backend API
- Verify `customColors` prop is passed to `InviteCard`
- Check browser console for errors

### Color Picker Not Opening
- Ensure `react-colorful` is installed: `npm install react-colorful`
- Check for JavaScript errors in console

### Colors Reset After Refresh
- Backend integration required
- Currently only stores in component state (temporary)
- Implement `apiHelpers.updateWedding()` call

---

**Status**: ✅ Frontend implementation complete. Backend integration required for persistence.
