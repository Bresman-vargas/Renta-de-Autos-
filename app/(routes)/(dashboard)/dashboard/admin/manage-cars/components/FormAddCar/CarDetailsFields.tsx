import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { transmissionTypes, engineTypes, carTypes, formSchema } from './FormSchema'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface CarDetailsFieldsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
}
export function CarDetailsFields({ form }: CarDetailsFieldsProps) {
    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model Car</FormLabel>
                        <FormControl>
                            <Input placeholder="Tesla Model S" autoComplete='off' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CV</FormLabel>
                            <FormControl>
                                <Input placeholder="670" autoComplete='off' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>People</FormLabel>
                            <FormControl>
                                <Input placeholder="5" autoComplete='off' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the transmission"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                            transmissionTypes.map((trans) => (
                                <SelectItem key={trans.value} value={trans.value}>
                                    {trans.label}
                                </SelectItem>
                            ))  
                            }
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="priceDay"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price Day</FormLabel>
                        <FormControl>
                            <Input placeholder="120000" autoComplete='off' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='grid grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name="engine"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Engine</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Engine"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {engineTypes.map((engine) => (
                                        <SelectItem key={engine.value} value={engine.value}>
                                            {engine.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {carTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}