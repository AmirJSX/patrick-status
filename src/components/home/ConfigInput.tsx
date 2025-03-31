import { useEffect, useState } from 'react';
import { LuBookmark, LuSend, LuTrash2 } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getStatus } from '~/services/get-status';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useUserStore } from '~/stores/usersStore';
import { StatusQuery } from '~/queries/status';

const ConfigInput = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('', { keyPrefix: 'home' });

  const [isFocused, setIsFocused] = useState(false);

  const { addUser } = useUserStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ConfigFormData) => {
      const res = await getStatus(data.config, 'text');
      return { result: res, save: data.save };
    },
    onSuccess: ({ result: data, save }) => {
      queryClient.setQueryData(StatusQuery(data.result.hash, i18n.language).queryKey, data);
      navigate({
        to: '/status/$hash',
        params: {
          hash: data.result.hash,
        },
      });

      if (save) {
        addUser({
          hash: data.result.hash,
          email: data.result.FrontEnd.email,
        });
      }
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const configSchema = z.object({
    config: z
      .string()
      .trim()
      .min(1, { message: t('isEmpty') }),
    save: z.boolean(),
  });

  type ConfigFormData = z.infer<typeof configSchema>;

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      save: true,
      config: '',
    },
  });

  useEffect(() => {
    if (errors.config) {
      trigger();
    }
  }, [i18n.language]);

  const onSubmit = (data: ConfigFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-4'>
      <span className='group w-fit'>
        <h1 className='text-rinbow text-3xl font-bold'>{t('title')}</h1>
      </span>
      <div>
        <div className='font-english glass-card !rounded-none'>
          <textarea
            className='scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent scrollbar-thumb-rounded-full relative z-10 w-full resize-none bg-transparent p-10 text-lg text-white placeholder-white/70 outline-none focus:ring-0'
            dir='ltr'
            disabled={mutation.isPending}
            rows={4}
            placeholder='vless://xxxxxx , vmess://xxxxxx , uuid , patrick://xxxxxx'
            {...register('config')}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="text-red-400' absolute bottom-0 p-2 text-sm text-red-400 italic">
            {errors.config?.message}
          </div>
          {errors.config && (
            <div
              className={cn('absolute top-0 left-0 z-10 h-0.5 transition-all duration-300', {
                'bg-red-500': errors.config,
                'bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500': !errors.config,
                'w-full': isFocused || watch('config'),
              })}
            />
          )}
        </div>

        <div className='glass-card flex w-full justify-between gap-2 !rounded-t-none !border-t-transparent'>
          <div className='flex gap-2'>
            <button
              disabled={!watch('config') || mutation.isPending}
              type='button'
              className='flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => resetField('config')}
              title={'Clear'}
            >
              <LuTrash2 className='h-5 w-5' />
            </button>
            <input type='hidden' {...register('save')} />
            <button
              disabled={!watch('config') || mutation.isPending}
              type='button'
              title={'Save'}
              onClick={() =>
                setValue('save', watch('save') === true ? false : true, {
                  shouldValidate: true,
                })
              }
              className='flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
            >
              <LuBookmark className={cn('h-5 w-5', { 'fill-pink-500': watch('save') })} />
            </button>
          </div>

          <button
            type='submit'
            title={'Send'}
            className='flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
            disabled={!!errors.config || mutation.isPending}
          >
            <LuSend className='h-5 w-5' />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ConfigInput;
