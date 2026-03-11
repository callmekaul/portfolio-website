'use client';

import { useRef, useEffect, useCallback } from 'react';
import { playlist } from '@/data/playlist';
import { useWindowStore } from '@/stores/windowStore';
import {
  useMusicStore,
  ensureSCApi,
  setWidget,
  getWidget,
  getWidgetEvents,
  type SCWidget,
  type SCWidgetEvents,
} from '@/stores/musicStore';

/**
 * Always-mounted component that owns the SoundCloud iframe.
 * Music persists even when the Music window is closed.
 */
export default function MusicProvider() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentIndex = useMusicStore((s) => s.currentIndex);
  const ready = useMusicStore((s) => s.ready);

  const bindEvents = useCallback((widget: SCWidget, events: SCWidgetEvents) => {
    const store = useMusicStore.getState();

    widget.bind(events.PLAY, () => {
      useMusicStore.getState().setIsPlaying(true);
      widget.getDuration((d) => useMusicStore.getState().setDuration(d));
      widget.getVolume((v) => {
        const vol = useMusicStore.getState().volume;
        if (v !== vol) widget.setVolume(vol);
      });
    });

    widget.bind(events.PAUSE, () => useMusicStore.getState().setIsPlaying(false));

    widget.bind(events.FINISH, () => {
      useMusicStore.getState().setIsPlaying(false);
      useMusicStore.getState().nextTrack();
    });

    widget.bind(events.PLAY_PROGRESS, (data: unknown) => {
      const d = data as { currentPosition: number };
      useMusicStore.getState().setCurrentTime(d.currentPosition);
    });

    void store; // used above via getState
  }, []);

  // Initialize SC widget
  useEffect(() => {
    let destroyed = false;

    ensureSCApi().then(() => {
      if (destroyed || !iframeRef.current || !window.SC) return;

      const widget = window.SC.Widget(iframeRef.current);
      const events = window.SC.Widget.Events;
      setWidget(widget, events);

      widget.bind(events.READY, () => {
        if (destroyed) return;
        useMusicStore.getState().setReady(true);
        bindEvents(widget, events);
      });
    });

    return () => {
      destroyed = true;
      setWidget(null, null);
    };
  }, [bindEvents]);

  // Load new track when index changes
  useEffect(() => {
    const w = getWidget();
    const events = getWidgetEvents();
    if (!w || !events || !ready) return;

    const track = playlist[currentIndex];
    w.load(track.trackUrl, {
      auto_play: true,
      show_artwork: false,
      callback: () => {
        bindEvents(w, events);
      },
    });
  }, [currentIndex, ready, bindEvents]);

  // Pause music when music window is closed
  const musicIsOpen = useWindowStore((s) => s.windows.music.isOpen);
  useEffect(() => {
    if (!musicIsOpen) {
      getWidget()?.pause();
    }
  }, [musicIsOpen]);

  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(playlist[0].trackUrl)}&auto_play=false&show_artwork=false&show_playcount=false&show_user=false&buying=false&sharing=false&download=false&color=%2322d3ee`;

  return (
    <iframe
      ref={iframeRef}
      className="absolute h-0 w-0 overflow-hidden"
      src={embedUrl}
      allow="autoplay"
      tabIndex={-1}
    />
  );
}
