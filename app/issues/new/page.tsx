'use client';

import { Button, Text, TextField } from '@radix-ui/themes';
import React from 'react';  
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/app/postSchema';
import { z } from 'zod';

// const 
type IssueForm = z.infer<typeof postSchema>;

// Dynamically import SimpleMDE only on the client side
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { isValid, isLoading, errors} } = useForm<IssueForm>({
        resolver: zodResolver(postSchema)
    });

    return (
        <form className='max-w-xl space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                console.log(data);
                await axios.post('/api/issues', data);
                router.push('/issues');
            })}
        >
            <TextField.Root placeholder='Title' {...register('title')} />
            {errors.title && <Text color='red'>'enter correct title'</Text>}
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE {...field} />}
            />
            <Button type="submit">Create</Button>
        </form>
    );
};

export default NewIssuePage;
