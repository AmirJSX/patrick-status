import { useI18nStore } from '~/stores/i18nStore';
import LanguageButton from './LanguageButton';
import logo from '~/assets/logo.webp';
import { Link } from '@tanstack/react-router';

const Header = () => {
  const { isShow } = useI18nStore();
  return (
    <header className='mx-auto flex h-20 w-full items-center justify-between px-3 pt-5 sm:px-8 lg:px-10'>
      <Link to='/'>
        <img src={logo} alt='Logo' className='h-auto max-w-full' width={138} height={56} />
      </Link>
      {isShow && <LanguageButton />}
    </header>
  );
};

export default Header;
