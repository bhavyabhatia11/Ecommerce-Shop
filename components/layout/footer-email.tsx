'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { addCustomer } from 'components/cart/actions';
import { MoveRightIcon } from 'lucide-react';

export const EmailSignup = () => {
  const { toast } = useToast();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      try {
        addCustomer(email);
        toast({
          title: 'Email Submitted',
          description: `You have subscribed with email: ${email}`
        });
      } catch (e) {
        return 'Error in submitting email!';
      }
    }

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 lg:gap-8">
      <div className="w-4/5">
        Subscribe to our newsletter to receive product updates and promotions
      </div>
      <div className="flex items-center space-x-2 ">
        <Input
          type="email"
          name="email"
          className="rounded-none bg-transparent"
          placeholder="Email address*"
          required
        />
        <Button className="rounded-none bg-transparent" type="submit">
          <MoveRightIcon />
        </Button>
      </div>
    </form>
  );
};
