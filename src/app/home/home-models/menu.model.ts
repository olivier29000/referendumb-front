export interface Menu {
    headTitle1? : string;
    headTitle2? : string;
    path? : string;
    title? : string ;
    type? : string;
    icon?: string;
    active?: boolean;
    bookmark? : boolean;
    items? : Menu[]
    children? : Menu[];
    level?: number;
    badge?: boolean,
    badgeText? : string;
  }

  export const MENUACCUEIL: Menu = {
    title: 'Accueil',
    icon: 'airplay',
    type: 'link',
    active: true,
    level: 1,
    path: '',
  }

  export const MENURH: Menu = {
    title: 'RH',
    icon: 'airplay',
    type: 'link',
    active: false,
    level: 1,
    path: '/rh',
  }

  export const MENUITEMLIST: Menu[] = [
    MENUACCUEIL, MENURH
  ]