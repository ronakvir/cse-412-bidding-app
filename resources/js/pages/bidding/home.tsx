import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

type Bidding = {
    id: number;
    name: string;
    currentPrice: number;
    expiresAt: string;
    username: string;
};

interface HomeProps {
    activeBiddings: Bidding[];
}

export default function Home({ activeBiddings }: HomeProps) {
    return (
        <>
            <Head title="Home" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Active Biddings</h1>
                {activeBiddings.length === 0 ? (
                    <p className="text-muted-foreground">No active biddings available right now.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activeBiddings.map((bid) => (
                            <Card key={bid.id}>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{bid.name}</h2>
                                    <p className="text-lg font-bold mb-2">${bid.currentPrice.toFixed(2)}</p>
                                    <Badge>
                                        Ends {formatDistanceToNow(new Date(bid.expiresAt), { addSuffix: true })}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground py-2 mb-2">Listed by: {bid.username}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
