const FingerListEn: Array<{ value: string; label: string }> = [
  {
    value: 'LEFT_THUMB',
    label: 'Left Thumb'
  },
  {
    value: 'LEFT_INDEX',
    label: 'Left Index'
  },
  {
    value: 'LEFT_MIDDLE',
    label: 'Left Middle'
  },
  {
    value: 'LEFT_RING',
    label: 'Left Ring'
  },
  {
    value: 'LEFT_LITTLE',
    label: 'Left Little'
  },
  {
    value: 'RIGHT_THUMB',
    label: 'Right Thumb'
  },
  {
    value: 'RIGHT_INDEX',
    label: 'Right Index'
  },
  {
    value: 'RIGHT_MIDDLE',
    label: 'Right Middle'
  },
  {
    value: 'RIGHT_RING',
    label: 'Right Ring'
  },
  {
    value: 'RIGHT_LITTLE',
    label: 'Right Little'
  }
]

const FingerListFr: Array<{ value: string; label: string }> = [
  {
    value: 'LEFT_THUMB',
    label: 'Pouce gauche'
  },
  {
    value: 'LEFT_INDEX',
    label: 'Index de gauche'
  },
  {
    value: 'LEFT_MIDDLE',
    label: 'Milieu gauche'
  },
  {
    value: 'LEFT_RING',
    label: 'Anneau gauche'
  },
  {
    value: 'LEFT_LITTLE',
    label: 'Petit gauche'
  },
  {
    value: 'RIGHT_THUMB',
    label: 'Pouce droit'
  },
  {
    value: 'RIGHT_INDEX',
    label: 'Index droit'
  },
  {
    value: 'RIGHT_MIDDLE',
    label: 'Milieu droit'
  },
  {
    value: 'RIGHT_RING',
    label: 'Anneau droit'
  },
  {
    value: 'RIGHT_LITTLE',
    label: 'Petit droit'
  }
]

export const fingerListTranslated = (lang: string) => (lang === 'en' ? FingerListEn : FingerListFr)
