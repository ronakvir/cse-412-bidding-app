import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Bidding } from './types';

interface HomeProps {
  activeBiddings: Bidding[];
}

export default function Home({ activeBiddings }: HomeProps) {
  return (
    <>
      <Head title="Home" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Active Biddings</h1>
          <Link href="/create-bid">
            <Button>Create New Bid</Button>
          </Link>
        </div>

        {activeBiddings.length === 0 ? (
          <p className="text-muted-foreground">No active biddings available right now.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeBiddings.map((bid) => (
              <Link
                key={bid.id}
                href={`/listing/${bid.id}`}
                className="block hover:shadow-lg transition-shadow"
              >
                <Card className="cursor-pointer">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{bid.name}</h2>
                    <p className="text-lg font-bold mb-2">${bid.currentPrice.toFixed(2)}</p>
                    <Badge>
                      Ends {formatDistanceToNow(new Date(bid.expiresAt), { addSuffix: true })}
                    </Badge>
                    <p className="text-xs text-muted-foreground py-2 mb-2">
                      Listed by: {bid.username}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
