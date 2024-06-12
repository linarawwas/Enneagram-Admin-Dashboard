import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Questions',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Categories',
    path: '/products',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
