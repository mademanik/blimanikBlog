import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'blogs',
    title: 'Blogs',
    translate: 'MENU.BLOG',
    type: 'item',
    icon: 'image',
    url: 'blogs'
  },
  {
    id: 'akun',
    title: 'Akun',
    translate: 'MENU.AKUN',
    type: 'item',
    icon: 'user',
    url: 'akun-detail',
  },
]
