import { createFileRoute } from '@tanstack/react-router';
import ConfigInput from '~/components/home/ConfigInput';
import hand from '~/assets/hand.webp';
import Users from '~/components/home/Users';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-10'>
      <div className='flex w-full flex-col items-center justify-center gap-5 sm:flex-row'>
        <ConfigInput />
        <img className='hidden w-1/2 sm:block' width={604} height={570.05} src={hand} alt='Hand' />
      </div>
      <Users />
    </div>
  );
}
