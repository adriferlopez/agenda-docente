import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconFile, IconPlus, IconTrash, IconLink } from '@/components/ui/icons-extra-2';
import type { DriveAttachment } from '@/types';

interface Props {
  attachments: DriveAttachment[];
  onChange: (attachments: DriveAttachment[]) => void;
}

/**
 * Por ahora permite añadir enlaces de Google Drive manualmente (pegando la URL
 * de "compartir"). Está preparado para sustituirse por el Google Picker API
 * (selector visual de archivos de Drive) una vez configurado el OAuth client.
 */
export default function DriveAttachmentPicker({ attachments, onChange }: Props) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  function handleAdd() {
    if (!url.trim()) return;
    const attachment: DriveAttachment = {
      id: crypto.randomUUID(),
      name: name.trim() || extractFileName(url) || 'Documento de Drive',
      url: url.trim(),
    };
    onChange([...attachments, attachment]);
    setUrl('');
    setName('');
  }

  function handleRemove(id: string) {
    onChange(attachments.filter((a) => a.id !== id));
  }

  return (
    <div className="flex flex-col gap-2">
      {attachments.map((a) => (
        <a
          key={a.id}
          href={a.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-sky-50 text-sky-600 rounded-2xl px-3 py-2 text-sm group"
        >
          <IconFile size={16} />
          <span className="flex-1 truncate">{a.name}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleRemove(a.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-sky-600 hover:text-rose-600"
          >
            <IconTrash size={14} />
          </button>
        </a>
      ))}

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="https://drive.google.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          icon={<IconLink size={14} />}
          className="flex-1"
        />
        <Input
          placeholder="Nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="sm:w-48"
        />
        <Button type="button" variant="secondary" size="sm" onClick={handleAdd} icon={<IconPlus size={16} />}>
          {t('weekly.addAttachment')}
        </Button>
      </div>
    </div>
  );
}

function extractFileName(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    return null;
  }
}
