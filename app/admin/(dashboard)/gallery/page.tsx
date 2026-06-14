"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Upload, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface GalleryItem { id: number; imageUrl: string; label: string | null; description: string | null; isActive: boolean; }

export default function GalleryManager() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [label, setLabel] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("/api/admin/gallery").then(r => r.json()).then(d => { setImages(d.items || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Only images allowed");
        if (file.size > 10 * 1024 * 1024) return toast.error("Max 10MB allowed");

        setUploading(true);

        // 1. Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (!uploadRes.ok) { toast.error("Upload failed"); setUploading(false); return; }
        const { url } = await uploadRes.json();

        // 2. Save to database
        const saveRes = await fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: url, label: label || file.name.split(".")[0], description: "" }),
        });
        if (saveRes.ok) {
            const d = await saveRes.json();
            setImages([...images, d.item]);
            setLabel("");
            toast.success("Image uploaded successfully!");
        } else {
            toast.error("Failed to save");
        }
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
    }

    async function removeImage(id: number) {
        const res = await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        if (res.ok) { setImages(images.filter(i => i.id !== id)); toast.success("Image removed"); }
        else toast.error("Failed to remove");
    }

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Gallery Manager</h1>
                <p className="text-muted-foreground text-sm mt-1">Upload and manage hospital photos</p>
            </div>

            {/* Upload Card */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upload New Image</CardTitle>
                    <CardDescription>Images are stored on Cloudinary CDN (auto-optimized)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input placeholder="Label (optional)" value={label} onChange={(e) => setLabel(e.target.value)} className="sm:w-48" />
                        <div className="flex-1 relative">
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" disabled={uploading} />
                            <div className={`flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-lg text-sm font-medium transition-colors ${uploading ? "border-muted bg-muted text-muted-foreground" : "border-muted-foreground/25 hover:border-primary/50 text-muted-foreground hover:text-foreground cursor-pointer"}`}>
                                {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Click or drag to upload image</>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
                            <p className="text-sm font-medium">No images yet</p>
                            <p className="text-xs mt-1">Upload your first hospital photo above</p>
                        </CardContent>
                    </Card>
                ) : images.map((img) => (
                    <Card key={img.id} className="overflow-hidden group">
                        <div className="h-44 bg-muted relative">
                            <img src={img.imageUrl} alt={img.label || ""} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                <Button variant="destructive" size="sm" onClick={() => removeImage(img.id)} className="opacity-0 group-hover:opacity-100 transition-opacity h-8 text-xs">
                                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-3 flex items-center justify-between">
                            <span className="text-sm font-medium truncate">{img.label || "Untitled"}</span>
                            <Badge variant="secondary" className="text-[10px]">{img.isActive ? "Active" : "Hidden"}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
