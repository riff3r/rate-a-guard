"use client";
import React, { useState } from 'react';
import { Building2, ChevronDown, Pencil, User } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from '../../ui/popover';

const Navbar: React.FC = () => {
    const [isSearchingGuard, setIsSearchingGuard] = useState(true);
    const [isSearchingCompany, setIsSearchingCompany] = useState(false);
    return (
        <div className='bg-foreground mb-8 px-6 py-3'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-6'>
                        <div className='logo bg-white px-6 py-1 text-center text-lg font-semibold text-black'>RAG</div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center text-white'>
                                {isSearchingGuard ? <User size={20} /> : <Building2 size={20} />}{' '}
                                <div className='ml-1 mr-2'>{isSearchingGuard ? 'Guard' : 'Company'}</div>
                                <ChevronDown size={20} strokeWidth={3} />
                            </DropdownMenuTrigger>
                            
                            <DropdownMenuContent onClick={() => setIsSearchingGuard(!isSearchingGuard)}>
                                {isSearchingGuard ? (
                                    <DropdownMenuItem>
                                        <Building2 size={20} />
                                        Company
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem>
                                        <User size={20} />
                                        Guard
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Popover>
                            <PopoverTrigger><Input type='text' placeholder={isSearchingGuard ? 'Guard Name' : 'Company Name'} className='w-[350px]' /></PopoverTrigger>
                            <PopoverContent>Place content for the popover here.</PopoverContent>
                        </Popover>

                        {isSearchingGuard && (
                            <>
                                <div className='text-white'>at</div>
                                {isSearchingCompany ? (
                                    <Input
                                        type='text'
                                        placeholder='Company Name'
                                        className='w-[250px]'
                                        onMouseLeave={() => setIsSearchingCompany(false)}
                                    />
                                ) : (
                                    <div className='flex items-center gap-4'>
                                        <div
                                            className='underline-offset-3 cursor-pointer font-bold text-white underline'
                                            onClick={() => setIsSearchingCompany(true)}
                                        >
                                            Guard Company
                                        </div>
                                        <Pencil
                                            color='white'
                                            size={18}
                                            className='cursor-pointer'
                                            onClick={() => setIsSearchingCompany(true)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className='flex items-center gap-4'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center text-white'>
                                <Button size='sm' className='rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none'>
                                    Hey, User
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem className='focus:bg-primary focus:text-white'>Profile</DropdownMenuItem>
                                <DropdownMenuItem className='focus:bg-primary focus:text-white'>Account Settings</DropdownMenuItem>
                                <DropdownMenuItem className='focus:bg-primary focus:text-white'>Your Ratings</DropdownMenuItem>
                                <DropdownMenuItem className='focus:bg-primary focus:text-white'>Saved Guards</DropdownMenuItem>
                                <DropdownMenuItem className='focus:bg-primary focus:text-white'>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* <Button className='rounded-full bg-white font-semibold text-black hover:bg-neutral-700 hover:text-white h-8'>Help</Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
