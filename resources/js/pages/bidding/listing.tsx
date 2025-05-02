import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

type Listing = {
    id: number;
    name: string;
    currentPrice: number;
    expiresAt: string;
    username: string;
};

type Bid = {
    username: string;
    price: number;
    createdAt: string;
};

interface Props {
    listing: Listing;
    bids: Bid[];
}

export default function ListingPage({ listing, bids }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        price: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('listing.bid', listing.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title={listing.name} />
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">{listing.name}</h1>
                    <p className="text-muted-foreground">Listed by {listing.username}</p>
                    <p className="text-lg font-semibold mt-2">Current Price: ${listing.currentPrice.toFixed(2)}</p>
                    <p className="text-sm text-red-600">
                        Expires {formatDistanceToNow(new Date(listing.expiresAt), { addSuffix: true })}
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Your Username</Label>
                        <Input
                            id="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                        />
                        <InputError message={errors.username} />
                    </div>
                    <div>
                        <Label htmlFor="price">Your Bid ($)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors.price} />
                    </div>
                    <Button type="submit" disabled={processing}>
                        Place Bid
                    </Button>
                </form>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Previous Bids</h2>
                    {bids.length === 0 ? (
                        <p className="text-muted-foreground">No bids yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {bids.map((bid, index) => (
                                <li key={index} className="border p-3 rounded-md">
                                    <p className="font-medium">{bid.username}</p>
                                    <p className="text-sm">Bid: ${bid.price.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{bid.createdAt}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
