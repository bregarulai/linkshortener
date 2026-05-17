"use client";

import { ExternalLink, Edit3, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Link {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
}

interface LinkRowProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export function LinkRow({ link, onEdit, onDelete }: LinkRowProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              `/{link.shortCode}`
            </a>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onEdit(link)}
            >
              <Edit3 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(link)}
            >
              <Trash2 className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" asChild>
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground truncate">
          {link.originalUrl}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Created {new Date(link.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
