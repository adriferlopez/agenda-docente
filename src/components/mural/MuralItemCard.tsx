import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconEdit } from '@/components/ui/icons';
import { IconStar, IconLink, IconFolder } from '@/components/ui/icons-extra';
import { subjectColorClasses } from '@/components/ui/subjectColors';
import { setMuralFavorite, updateMuralItem } from '@/firebase/murals';
import { isSafeHttpUrl } from '@/utils/url';
import type { MuralItem, MuralFolder } from '@/types';

interface Props {
  item: MuralItem;
  folder?: MuralFolder;
  folders: MuralFolder[];
  favoritesCount: number;
  onEdit: () => void;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function MuralItemCard({ item, folder, folders, favoritesCount, onEdit }: Props) {
  const { t } = useTranslation();
  const [moveOpen, setMoveOpen] = useState(false);

  function handleCardClick() {
    if (item.linkUrl && isSafeHttpUrl(item.linkUrl)) {
      window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      onEdit();
    }
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !item.favorite;
    void setMuralFavorite(item.id, next, next ? favoritesCount : undefined);
  }

  function handleMoveToFolder(e: React.MouseEvent, folderId: string | null) {
    e.stopPropagation();
    setMoveOpen(false);
    void updateMuralItem(item.id, { folderId });
  }

  return (
    <div
      onClick={handleCardClick}
      className="card-pastel p-4 text-left flex flex-col gap-2 hover:shadow-md transition cursor-pointer aspect-square sm:aspect-[4/3] relative"
    >
      <div className="flex items-center justify-between gap-2">
        {folder ? (
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${subjectColorClasses[folder.color].dot}`} title={folder.name} />
        ) : (
          <span />
        )}
        <button
          onClick={handleToggleFavorite}
          title={t('mural.favorite')}
          aria-label={t('mural.favorite')}
          className="shrink-0"
          style={{ color: item.favorite ? '#B45309' : 'var(--text-secondary)' }}
        >
          <IconStar size={16} fill={item.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="font-semibold text-ink line-clamp-2">{item.title || t('mural.untitled')}</p>
      {item.note && <p className="text-xs text-ink-soft line-clamp-3 flex-1">{item.note}</p>}
      {item.linkUrl && (
        <span className="text-xs text-accent flex items-center gap-1 truncate">
          <IconLink size={12} className="shrink-0" />
          <span className="truncate">{hostnameOf(item.linkUrl)}</span>
        </span>
      )}

      <div className="flex items-center justify-end gap-1 mt-auto">
        {folders.length > 0 && (
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMoveOpen((o) => !o); }}
              title={t('mural.moveToFolder')}
              aria-label={t('mural.moveToFolder')}
              className="p-1 text-ink-soft hover:text-accent"
            >
              <IconFolder size={14} />
            </button>
            {moveOpen && (
              <>
                {/* Overlay para cerrar el menú al hacer clic fuera, sin depender
                    de listeners globales de document (más simple y evita fugas). */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={(e) => { e.stopPropagation(); setMoveOpen(false); }}
                />
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 bottom-full mb-1 z-50 rounded-xl shadow-lg py-1 min-w-[9rem]"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <button
                    onClick={(e) => handleMoveToFolder(e, null)}
                    className={`w-full text-left text-xs px-3 py-1.5 hover:bg-accent-light ${!item.folderId ? 'font-semibold text-accent' : 'text-ink'}`}
                  >
                    {t('mural.noFolder')}
                  </button>
                  {folders.map((f) => (
                    <button
                      key={f.id}
                      onClick={(e) => handleMoveToFolder(e, f.id)}
                      className={`w-full flex items-center gap-2 text-left text-xs px-3 py-1.5 hover:bg-accent-light ${item.folderId === f.id ? 'font-semibold text-accent' : 'text-ink'}`}
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${subjectColorClasses[f.color].dot}`} />
                      <span className="truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          title={t('common.edit')}
          aria-label={t('common.edit')}
          className="p-1 text-ink-soft hover:text-accent"
        >
          <IconEdit size={14} />
        </button>
      </div>
    </div>
  );
}
