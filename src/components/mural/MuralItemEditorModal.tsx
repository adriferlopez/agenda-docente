import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { IconTrash, IconCheck } from '@/components/ui/icons';
import { IconStar, IconLink } from '@/components/ui/icons-extra';
import { updateMuralItem, deleteMuralItem, setMuralFavorite } from '@/firebase/murals';
import type { MuralItem, MuralFolder } from '@/types';

interface Props {
  item: MuralItem;
  folders: MuralFolder[];
  favoritesCount: number;
  language: string;
  onClose: () => void;
}

export default function MuralItemEditorModal({ item, folders, favoritesCount, language, onClose }: Props) {
  const { t } = useTranslation();

  const [title, setTitle] = useState(item.title);
  const [note, setNote] = useState(item.note ?? '');
  const [linkUrl, setLinkUrl] = useState(item.linkUrl ?? '');
  const [folderId, setFolderId] = useState(item.folderId ?? '');
  const [favorite, setFavorite] = useState(item.favorite ?? false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await updateMuralItem(item.id, {
        title: title.trim() || t('mural.untitled'),
        note,
        linkUrl: linkUrl.trim(),
        folderId: folderId || null,
      });
      if (favorite !== (item.favorite ?? false)) {
        await setMuralFavorite(item.id, favorite, favorite ? favoritesCount : undefined);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(t('mural.deleteItemConfirm'))) return;
    await deleteMuralItem(item.id);
    onClose();
  }

  return (
    <Modal open onClose={onClose} title={item.title || t('mural.newItem')} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <Input
            label={t('mural.itemTitle')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setFavorite((f) => !f)}
            title={t('mural.favorite')}
            aria-label={t('mural.favorite')}
            className="shrink-0 rounded-xl p-2.5 mb-0.5"
            style={{
              background: favorite ? '#FEF3C7' : 'var(--bg-input)',
              color: favorite ? '#B45309' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <IconStar size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {folders.length > 0 && (
          <Select label={t('mural.folder')} value={folderId} onChange={(e) => setFolderId(e.target.value)} className="max-w-xs">
            <option value="">{t('mural.noFolder')}</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </Select>
        )}

        <div>
          <label className="text-sm font-medium text-ink-soft flex items-center gap-1.5 mb-1.5">
            <IconLink size={14} /> {t('mural.link')}
          </label>
          <p className="text-xs text-ink-soft mb-1.5">{t('mural.linkHelp')}</p>
          <Input
            placeholder={t('mural.linkPlaceholder')}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            type="url"
          />
        </div>

        <Textarea
          label={t('mural.note')}
          placeholder={t('mural.notePlaceholder')}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          lang={language}
          spellCheck
        />

        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving} icon={saved ? <IconCheck size={16} /> : undefined}>
            {t('common.save')}
          </Button>
          <Button variant="danger" onClick={handleDelete} icon={<IconTrash size={16} />}>
            {t('mural.deleteItem')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
