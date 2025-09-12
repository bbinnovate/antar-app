# Razorpay Backend Integration Guide - Next.js App Router

## Required Backend Endpoints

You need to implement these two API routes in your Next.js app:

### 1. Create Razorpay Order Endpoint

**File:** `app/api/app/payment/create-razorpay-order/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, receipt, planId } = body;

    // Validate authentication (use your existing auth system)
    const token = request.headers.get('token') || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Token required' },
        { status: 401 }
      );
    }

    // TODO: Validate token with your existing auth system
    // const user = await validateUserToken(token);
    // if (!user) {
    //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    // }

    // Validate required fields
    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    const options = {
      amount: parseInt(amount), // amount in paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        planId: planId || 'antar_parivar_monthly',
        // userId: user.id,
        // userEmail: user.email,
        app: 'antar-mobile-app'
      }
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order.id);

    return NextResponse.json({
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status
      }
    });

  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create order',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

### 2. Verify Payment Endpoint

**File:** `app/api/app/payment/verify-razorpay-payment/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // Validate authentication (use your existing auth system)
    const token = request.headers.get('token') || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Token required' },
        { status: 401 }
      );
    }

    // TODO: Validate token with your existing auth system
    // const user = await validateUserToken(token);
    // if (!user) {
    //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    // }

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        {
          verified: false,
          error: 'Missing payment verification data'
        },
        { status: 400 }
      );
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    console.log('Signature verification:', {
      received: razorpay_signature,
      expected: expectedSign,
      match: razorpay_signature === expectedSign
    });

    if (razorpay_signature === expectedSign) {
      console.log('Payment verified successfully for order:', razorpay_order_id);

      // Update user subscription in Firebase
      await updateUserSubscription(user.id, {
        planId: 'antar_parivar_monthly',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: 'active',
        startDate: new Date(),
        amount: 19900, // ₹199 in paise
        currency: 'INR'
      });

      return NextResponse.json({
        verified: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });

    } else {
      console.log('Payment verification failed - signature mismatch');
      return NextResponse.json(
        {
          verified: false,
          error: 'Invalid payment signature'
        },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      {
        verified: false,
        error: 'Payment verification failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}

## Installation

First, install the Razorpay SDK in your Next.js backend:

```bash
npm install razorpay
```

## Environment Variables

Add these to your `.env.local` file and Vercel environment variables:

```bash
RAZORPAY_KEY_ID=rzp_test_R9TcCjdXNTjVZJ
RAZORPAY_KEY_SECRET=3aVENIFVEd6JDDXQy5j41mAA
```

## File Structure

Your Next.js app directory should look like:

```
app/
└── api/
    └── app/
        └── payment/
            ├── create-razorpay-order/
            │   └── route.ts
            └── verify-razorpay-payment/
                └── route.ts
```

## Firebase Database Setup

First, install Firebase Admin SDK:

```bash
npm install firebase-admin
```

### Initialize Firebase Admin

Create `lib/firebase-admin.ts`:

```typescript
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = getFirestore();
```

### Environment Variables (Add these)

```bash
# Firebase Admin credentials
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Subscription Data Structure

In Firebase, subscriptions will be stored as:

```
subscriptions/
├── {userId}/
    └── parivar/
        ├── planId: "antar_parivar_monthly"
        ├── paymentId: "pay_ABC123"
        ├── orderId: "order_ABC123"
        ├── status: "active"
        ├── amount: 19900
        ├── currency: "INR"
        ├── startDate: Timestamp
        ├── endDate: Timestamp (optional)
        ├── createdAt: Timestamp
        └── updatedAt: Timestamp
```


## Webhook Setup (Recommended)

Create webhook endpoint: `app/api/webhook/razorpay/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-razorpay-signature');
    const body = await request.text();
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');
      
    if (signature === expectedSignature) {
      const event = JSON.parse(body);
      console.log('Webhook received:', event.event);
      
      if (event.event === 'payment.captured') {
        // Update payment status in database
        const paymentEntity = event.payload.payment.entity;
        console.log('Payment captured:', paymentEntity.id);
        
        // Update subscription status in Firebase
        await updateSubscriptionFromWebhook(paymentEntity);
      }
      
      return NextResponse.json({ status: 'ok' });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
```

## Firebase Database Functions

Create `lib/subscription-service.ts`:

```typescript
import { db } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

interface SubscriptionData {
  planId: string;
  paymentId: string;
  orderId: string;
  status: string;
  startDate: Date;
  amount: number;
  currency: string;
  endDate?: Date;
}

export async function updateUserSubscription(userId: string, subscriptionData: SubscriptionData) {
  try {
    const subscriptionRef = db.collection('subscriptions').doc(userId).collection('plans').doc('parivar');
    
    const subscriptionDoc = {
      ...subscriptionData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await subscriptionRef.set(subscriptionDoc, { merge: true });
    console.log('Subscription updated for user:', userId);
    
    return true;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

export async function getUserSubscription(userId: string) {
  try {
    const subscriptionRef = db.collection('subscriptions').doc(userId).collection('plans').doc('parivar');
    const doc = await subscriptionRef.get();
    
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw error;
  }
}

export async function updateSubscriptionFromWebhook(paymentEntity: any) {
  try {
    // Find subscription by payment ID
    const subscriptionsRef = db.collectionGroup('plans');
    const query = subscriptionsRef.where('paymentId', '==', paymentEntity.id);
    const snapshot = await query.get();
    
    if (!snapshot.empty) {
      const promises = snapshot.docs.map(doc => {
        return doc.ref.update({
          status: 'confirmed',
          updatedAt: FieldValue.serverTimestamp(),
          webhookData: paymentEntity
        });
      });
      
      await Promise.all(promises);
      console.log('Subscription updated from webhook:', paymentEntity.id);
    }
  } catch (error) {
    console.error('Error updating subscription from webhook:', error);
    throw error;
  }
}

export async function cancelUserSubscription(userId: string) {
  try {
    const subscriptionRef = db.collection('subscriptions').doc(userId).collection('plans').doc('parivar');
    
    await subscriptionRef.update({
      status: 'cancelled',
      cancelledAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    
    console.log('Subscription cancelled for user:', userId);
    return true;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
}
```

## Updated Verification Endpoint with Firebase

Update your `verify-razorpay-payment/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateUserSubscription } from '@/lib/subscription-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // ... authentication and validation code (same as before) ...

    if (razorpay_signature === expectedSign) {
      console.log('Payment verified successfully for order:', razorpay_order_id);

      // Update user subscription in Firebase
      await updateUserSubscription(user.id, {
        planId: 'antar_parivar_monthly',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: 'active',
        startDate: new Date(),
        amount: 19900,
        currency: 'INR'
      });

      return NextResponse.json({
        verified: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      // ... error handling (same as before) ...
    }
  } catch (error: any) {
    // ... error handling (same as before) ...
  }
}
```

## Additional API Endpoints (Optional)

You might want these additional endpoints:

### Get User Subscription Status

**File:** `app/api/app/user/subscription/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getUserSubscription } from '@/lib/subscription-service';

export async function GET(request: NextRequest) {
  try {
    // Validate authentication
    const token = request.headers.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateUserToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const subscription = await getUserSubscription(user.id);
    
    return NextResponse.json({
      hasSubscription: !!subscription,
      subscription: subscription
    });
    
  } catch (error: any) {
    console.error('Error getting subscription:', error);
    return NextResponse.json({ 
      error: 'Failed to get subscription',
      message: error.message 
    }, { status: 500 });
  }
}
```

### Cancel Subscription

**File:** `app/api/app/user/cancel-subscription/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { cancelUserSubscription } from '@/lib/subscription-service';

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const token = request.headers.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await validateUserToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await cancelUserSubscription(user.id);
    
    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });
    
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ 
      error: 'Failed to cancel subscription',
      message: error.message 
    }, { status: 500 });
  }
}
```

## Testing Your Endpoints

You can test these endpoints using curl or Postman:

```bash
# Test create order
curl -X POST https://your-app.vercel.app/api/app/payment/create-razorpay-order \
  -H "Content-Type: application/json" \
  -H "token: your_user_token" \
  -d '{"amount": 19900, "currency": "INR", "planId": "antar_parivar_monthly"}'

# Test verify payment (after successful payment)
curl -X POST https://your-app.vercel.app/api/app/payment/verify-razorpay-payment \
  -H "Content-Type: application/json" \
  -H "token: your_user_token" \
  -d '{
    "razorpay_payment_id": "pay_test123",
    "razorpay_order_id": "order_test123", 
    "razorpay_signature": "signature_hash"
  }'
```