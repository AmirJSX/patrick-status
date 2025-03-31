import { apps } from '~/constants/apps';

const Apps = () => {
  return (
    <div className='flex w-full flex-col gap-10 font-medium lg:w-1/4'>
      {apps.map((app) => (
        <div key={app.name} className='flex flex-col gap-2'>
          <div className='glass-card flex items-center justify-center text-lg'>{app.name}</div>
          <div className='flex gap-2'>
            {app.apps.map((a) => (
              <a
                key={a.name}
                href={a.link}
                target='_blank'
                className='glass-card flex w-full items-center justify-center bg-white/15'
              >
                {a.name}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Apps;
