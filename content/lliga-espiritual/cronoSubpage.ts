import 'server-only';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ChronologyEvent {
  title: string;
  body: string;
  source?: string;
}

interface ChronologyDecade {
  title: string;
  events: ChronologyEvent[];
}

interface ChronologyCentury {
  title: string;
  decades: ChronologyDecade[];
}

interface ChronologySubpageContent {
  title: string;
  intro: string;
  sections: ChronologyCentury[];
  moreInfoHref?: string;
}

const CRONO_MARKDOWN_PATH = join(process.cwd(), 'docs', 'Crono.md');

const removeMarkdownEmphasis = (value: string) =>
  value.replaceAll('**', '').replaceAll('_', '').trim();

const parseEvent = (line: string): ChronologyEvent => {
  const cleanedLine = line.replace(/^-\s*/, '').trim();
  const eventMatch = cleanedLine.match(/^\*\*(.*?)\*\*:\s*(.*)$/);

  if (!eventMatch) {
    return {
      title: cleanedLine,
      body: '',
    };
  }

  return {
    title: removeMarkdownEmphasis(eventMatch[1]),
    body: removeMarkdownEmphasis(eventMatch[2]),
  };
};

const parseCronologyMarkdown = (markdown: string): ChronologySubpageContent => {
  const lines = markdown.split('\n');
  const content: ChronologySubpageContent = {
    title: '',
    intro: '',
    sections: [],
  };

  let currentCentury: ChronologyCentury | undefined;
  let currentDecade: ChronologyDecade | undefined;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    if (trimmedLine.startsWith('# ')) {
      content.title = trimmedLine.replace(/^#\s*/, '');
      continue;
    }

    if (!content.intro && !trimmedLine.startsWith('#')) {
      content.intro = trimmedLine;
      continue;
    }

    if (trimmedLine.startsWith('## Per saber-ne més')) {
      currentCentury = undefined;
      currentDecade = undefined;
      continue;
    }

    if (trimmedLine.startsWith('- https://')) {
      content.moreInfoHref = trimmedLine.replace(/^-\s*/, '');
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      currentCentury = {
        title: trimmedLine.replace(/^##\s*/, ''),
        decades: [],
      };
      content.sections.push(currentCentury);
      currentDecade = undefined;
      continue;
    }

    if (trimmedLine.startsWith('### ') && currentCentury) {
      currentDecade = {
        title: trimmedLine.replace(/^###\s*/, '').replace(/:$/, ''),
        events: [],
      };
      currentCentury.decades.push(currentDecade);
      continue;
    }

    if (trimmedLine.startsWith('- Font pendent') && currentDecade) {
      const lastEvent = currentDecade.events.at(-1);

      if (lastEvent) {
        lastEvent.source = trimmedLine.replace(/^-\s*Font pendent de revisió:\s*/, '');
      }

      continue;
    }

    if (trimmedLine.startsWith('- ') && currentDecade) {
      currentDecade.events.push(parseEvent(trimmedLine));
    }
  }

  return content;
};

export const cronoSubpage = parseCronologyMarkdown(
  readFileSync(CRONO_MARKDOWN_PATH, 'utf-8'),
);

export type {
  ChronologyCentury,
  ChronologyDecade,
  ChronologyEvent,
  ChronologySubpageContent,
};
