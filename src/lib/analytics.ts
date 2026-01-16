import { supabase, isSupabaseConfigured } from './supabase';

export type AnalyticsEventType = 'page_view' | 'product_view' | 'add_to_cart' | 'purchase' | 'search';

export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  page_path?: string;
  product_id?: string;
  user_id?: string;
  metadata?: Record<string, any>;
}

/**
 * Track an analytics event to Supabase
 */
export const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
  // Skip if Supabase is not configured
  if (!isSupabaseConfigured()) {
    if (import.meta.env.DEV) {
      console.log('Analytics event (Supabase not configured):', event);
    }
    return;
  }

  try {
    // Get current user ID from session if not provided
    let userId = event.user_id;
    if (!userId) {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id || null;
    }

    const { error } = await supabase.from('analytics').insert({
      event_type: event.event_type,
      page_path: event.page_path || window.location.pathname,
      product_id: event.product_id || null,
      user_id: userId,
      metadata: event.metadata || null,
    });

    if (error) {
      // Log errors in development for debugging
      if (import.meta.env.DEV) {
        console.warn('Analytics tracking error:', error);
        console.log('Failed event:', event);
      }
      // Silently fail in production to avoid disrupting user experience
      return;
    }
  } catch (error) {
    // Silently fail in development or if Supabase is not configured
    if (import.meta.env.DEV) {
      console.warn('Analytics tracking exception:', error);
      console.log('Failed event:', event);
    }
  }
};

/**
 * Track a page view
 */
export const trackPageView = (path?: string): void => {
  trackEvent({
    event_type: 'page_view',
    page_path: path || window.location.pathname,
  });
};

/**
 * Track a product view
 */
export const trackProductView = (productId: string): void => {
  trackEvent({
    event_type: 'product_view',
    product_id: productId,
    page_path: window.location.pathname,
  });
};

/**
 * Track add to cart
 */
export const trackAddToCart = (productId: string, metadata?: Record<string, any>): void => {
  trackEvent({
    event_type: 'add_to_cart',
    product_id: productId,
    metadata,
  });
};

/**
 * Track a purchase
 */
export const trackPurchase = (orderId: string, total: number, items: any[], metadata?: Record<string, any>): void => {
  trackEvent({
    event_type: 'purchase',
    metadata: {
      order_id: orderId,
      total,
      items,
      ...metadata,
    },
  });
};

/**
 * Track a search query
 */
export const trackSearch = (query: string, resultsCount?: number): void => {
  trackEvent({
    event_type: 'search',
    metadata: {
      query,
      results_count: resultsCount,
    },
  });
};

