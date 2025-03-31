import { FaUser } from 'react-icons/fa';
import { Link } from '@tanstack/react-router';
import { LuTrash2 } from 'react-icons/lu';
import { useUserStore } from '~/stores/usersStore';

const Users = () => {
  const { users, removeUser } = useUserStore();

  if (users.length !== 0) {
    return (
      <div dir='ltr' className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
          <Link
            to={'/status/$hash'}
            params={{ hash: user.hash }}
            key={user.hash}
            className='glass-card group font-english flex items-center justify-between p-4 font-semibold'
          >
            <span className='flex items-center gap-2 overflow-hidden'>
              <div className='flex items-center justify-center gap-1'>
                <FaUser size={20} />
                <p className='max-w-30 truncate'>{user.email}</p>
              </div>
            </span>

            <button
              type='button'
              className='flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
              onClick={(e) => {
                e.preventDefault();
                removeUser(user.hash);
              }}
              title={'Clear'}
            >
              <LuTrash2 className='h-5 w-5' />
            </button>
          </Link>
        ))}
      </div>
    );
  }
};

export default Users;
