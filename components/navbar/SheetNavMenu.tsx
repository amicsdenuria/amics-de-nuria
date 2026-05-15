'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { ChevronRightIcon, MenuIcon } from 'lucide-react';
import {
  NavSection,
  mainNavigation,
  mainPageHomeLabel,
} from '@/content/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

import { Button } from '../ui/button';
import HomeLink from './HomeLink';
import Link from 'next/link';
import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isSubItem?: boolean;
}
const NavLink = ({
  href,
  children,
  onClick,
  className,
  isSubItem = false,
}: NavLinkProps) => {
  const pathname = usePathname();

  // Links with hash (anchors) are never marked as "active" since we can't
  // reliably detect the current hash on the server. Only actual page links
  // (without hash) are marked active based on pathname.// Links with hash (anchors) are never marked as "active" since we can't
  // reliably detect the current hash on the server. Only actual page links
  // (without hash) are marked active based on pathname.
  const isHashLink = href.includes('#');
  const isActive = isHashLink ? false : pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isActive && 'bg-accent text-accent-foreground',
        isSubItem && 'pl-6 text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {isSubItem && (
        <ChevronRightIcon className="size-3 shrink-0 text-muted-foreground" />
      )}
      {children}
    </Link>
  );
};

interface NavItemProps {
  section: NavSection;
  onNavigate: () => void;
}

const NavItem = ({ section, onNavigate }: NavItemProps) => {
  const pathname = usePathname();
  const hasChildren = section.children && section.children.length > 0;

  // Check if any child is active to auto-expand (only for actual page links, not hash anchors)
  const isChildActive = hasChildren
    ? section.children?.some((child) => {
        // Hash links don't determine active state
        if (child.href.includes('#')) return false;

        return pathname === child.href || pathname.startsWith(child.href + '/');
      })
    : false;

  // Check if the section itself is active
  const isSectionActive =
    pathname === section.href || pathname.startsWith(section.href + '/');

  // If no children, render as a simple link
  if (!hasChildren) {
    return (
      <NavLink
        href={section.href}
        onClick={onNavigate}
        className={cn(
          'w-full justify-start py-3 text-base font-medium',
          isSectionActive && 'bg-accent text-accent-foreground',
        )}
      >
        {section.label}
      </NavLink>
    );
  }

  // With children, render as accordion with separate link for main page
  return (
    <AccordionItem
      value={section.id}
      className="border-none"
    >
      <AccordionTrigger
        className={cn(
          'rounded-md px-3 py-3 text-base font-medium hover:no-underline',
          'hover:bg-accent hover:text-accent-foreground',
          'data-[state=open]:bg-accent/50',
          (isSectionActive || isChildActive) && 'text-accent-foreground',
        )}
      >
        {section.label}
      </AccordionTrigger>
      <AccordionContent className="pb-2 pt-1">
        <nav className="flex flex-col gap-1">
          {/* Main section link */}
          <NavLink
            href={section.href}
            onClick={onNavigate}
            isSubItem
            className={cn(
              isSectionActive &&
                !isChildActive &&
                'bg-accent/50 text-accent-foreground',
            )}
          >
            {mainPageHomeLabel}
          </NavLink>

          {/* Children links */}
          {section.children?.map((child) => {
            // Hash links are never marked active
            const isHashLink = child.href.includes('#');
            const isChildItemActive = isHashLink
              ? false
              : pathname === child.href ||
                pathname.startsWith(child.href + '/');

            return (
              <NavLink
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                isSubItem
                className={cn(
                  isChildItemActive && 'bg-accent/50 text-accent-foreground',
                )}
              >
                {child.label}
              </NavLink>
            );
          })}
        </nav>
      </AccordionContent>
    </AccordionItem>
  );
};

interface SheetNavMenuProps {
  // Custom trigger button. If not provided, uses default menu icon button
  trigger?: React.ReactNode;
}

export const SheetNavMenu = ({ trigger }: SheetNavMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Determine which accordions should be open by default based on current path
  const defaultOpenSections = React.useMemo(() => {
    return mainNavigation
      .filter((section) => {
        if (!section.children?.length) return false;
        // Open if we're on the section page or a subpage
        if (
          pathname === section.href ||
          pathname.startsWith(section.href + '/')
        ) {
          return true;
        }
        // Also open if any child (non-hash) is active
        return section.children.some((child) => {
          if (child.href.includes('#')) return false;
          return (
            pathname === child.href || pathname.startsWith(child.href + '/')
          );
        });
      })
      .map((section) => section.id);
  }, [pathname]);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            variant={'outline'}
            size={'icon'}
            aria-label="Obrir menú de navegació"
          >
            <MenuIcon className="size-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-80 flex-col p-0"
      >
        <SheetHeader className="shrink-0 border-b px-4 py-4">
          <SheetTitle className="text-left">
            <div onClick={() => setOpen(false)}>
              <HomeLink />
            </div>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea
          // className="h-[calc(100vh-5rem)]"
          className="min-h-0 flex-1"
        >
          <div className="p-4">
            <Accordion
              type="multiple"
              defaultValue={defaultOpenSections}
              className="w-full"
            >
              <nav className="flex flex-col gap-1">
                {mainNavigation.map((section) => (
                  <NavItem
                    key={section.id}
                    section={section}
                    onNavigate={handleNavigate}
                  />
                ))}
              </nav>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
