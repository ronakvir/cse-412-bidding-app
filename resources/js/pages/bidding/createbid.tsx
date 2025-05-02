import { useForm, Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CreateBid() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        currentPrice: '',
        expiresAt: '',
        username: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('bidding.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Create Bid" />
            <div className="max-w-xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">Create a New Bid</h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Vintage Rolex Watch"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="currentPrice">Current Price ($)</Label>
                        <Input
                            id="currentPrice"
                            type="number"
                            step="0.01"
                            value={data.currentPrice}
                            onChange={(e) => setData('currentPrice', e.target.value)}
                        />
                        <InputError message={errors.currentPrice} />
                    </div>

                    <div>
                        <Label htmlFor="expiresAt">Expiration Date & Time</Label>
                        <Input
                            id="expiresAt"
                            type="datetime-local"
                            value={data.expiresAt}
                            onChange={(e) => setData('expiresAt', e.target.value)}
                        />
                        <InputError message={errors.expiresAt} />
                    </div>

                    <div>
                        <Label htmlFor="username">Your Username</Label>
                        <Input
                            id="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="e.g. ronak"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        Submit Bid
                    </Button>
                </form>
            </div>
        </>
    );
}
