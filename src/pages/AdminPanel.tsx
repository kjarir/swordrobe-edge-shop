import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import ProductManagement from "@/components/admin/ProductManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import { LogOut } from "lucide-react";
import { 
  ShoppingBag, 
  DollarSign, 
  Eye, 
  Package,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalViews: number;
  recentOrders: any[];
  topProducts: any[];
  salesData: { date: string; sales: number; orders: number }[];
  categoryData: { category: string; count: number; revenue: number }[];
  eventData: { event_type: string; count: number }[];
}

const AdminPanel = () => {
  const { user, signOut } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
    recentOrders: [],
    topProducts: [],
    salesData: [],
    categoryData: [],
    eventData: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  const COLORS = ['hsl(263, 70%, 70%)', 'hsl(263, 60%, 75%)', 'hsl(263, 50%, 80%)', 'hsl(263, 40%, 85%)', 'hsl(263, 30%, 90%)'];

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      const statCards = statsRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        chartsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [analytics]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch orders
      const { data: ordersData, count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(10);

      // Calculate total revenue
      const { data: allOrders } = await supabase
        .from('orders')
        .select('total_amount, status');
      
      const revenue = allOrders
        ?.filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Fetch analytics events
      const { count: viewsCount } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_view');

      // Fetch top products (by views)
      const { data: productViews } = await supabase
        .from('analytics')
        .select('product_id')
        .eq('event_type', 'product_view');

      const productViewCounts: Record<string, number> = {};
      productViews?.forEach(view => {
        if (view.product_id) {
          productViewCounts[view.product_id] = (productViewCounts[view.product_id] || 0) + 1;
        }
      });

      const topProductIds = Object.entries(productViewCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id]) => id);

      const { data: topProductsData } = await supabase
        .from('products')
        .select('id, name, price')
        .in('id', topProductIds);

      // Calculate sales data from actual orders in the database
      const salesData: { date: string; sales: number; orders: number }[] = [];
      
      // TODO: Calculate sales data from orders table based on timeRange
      // This would require aggregating orders by date
      
      // Category data
      const { data: productsData } = await supabase
        .from('products')
        .select('category, price');
      
      const categoryStats: Record<string, { count: number; revenue: number }> = {};
      productsData?.forEach(product => {
        if (!categoryStats[product.category]) {
          categoryStats[product.category] = { count: 0, revenue: 0 };
        }
        categoryStats[product.category].count++;
        categoryStats[product.category].revenue += product.price;
      });

      const categoryData = Object.entries(categoryStats).map(([category, stats]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        count: stats.count,
        revenue: stats.revenue,
      }));

      // Event type data
      const { data: eventsData } = await supabase
        .from('analytics')
        .select('event_type');

      const eventCounts: Record<string, number> = {};
      eventsData?.forEach(event => {
        eventCounts[event.event_type] = (eventCounts[event.event_type] || 0) + 1;
      });

      const eventData = Object.entries(eventCounts).map(([event_type, count]) => ({
        event_type: event_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count,
      }));

      setAnalytics({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalRevenue: revenue,
        totalViews: viewsCount || 0,
        recentOrders: ordersData || [],
        topProducts: topProductsData || [],
        salesData,
        categoryData,
        eventData,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Set empty data if Supabase is not configured or error occurs
      setAnalytics({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalViews: 0,
        recentOrders: [],
        topProducts: [],
        salesData: [],
        categoryData: [],
        eventData: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    change?: string;
    trend?: 'up' | 'down';
  }) => (
    <Card className="product-card hover-lift">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-heading tracking-wider uppercase text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-heading font-bold tracking-tight">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-2 flex items-center gap-1",
            trend === 'up' ? "text-green-600" : "text-red-600"
          )}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 md:py-28 bg-secondary">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-xl mb-4">Admin Panel</h1>
              <p className="body-lg text-muted-foreground max-w-2xl">
                Comprehensive analytics and insights for your e-commerce platform
              </p>
            </div>
            {user && (
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut();
                  window.location.href = '/login';
                }}
                className="font-heading tracking-wider"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Products"
              value={analytics.totalProducts}
              icon={Package}
              change="+12%"
              trend="up"
            />
            <StatCard
              title="Total Orders"
              value={analytics.totalOrders}
              icon={ShoppingBag}
              change="+8%"
              trend="up"
            />
            <StatCard
              title="Total Revenue"
              value={`$${analytics.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              change="+15%"
              trend="up"
            />
            <StatCard
              title="Total Views"
              value={analytics.totalViews.toLocaleString()}
              icon={Eye}
              change="+23%"
              trend="up"
            />
          </div>

          {/* Charts Section */}
          <div ref={chartsRef}>
            <Tabs defaultValue="overview" className="space-y-8">
              <div className="flex items-center justify-between">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="overview" className="font-heading text-xs tracking-wider">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="sales" className="font-heading text-xs tracking-wider">
                    Sales
                  </TabsTrigger>
                  <TabsTrigger value="manage-products" className="font-heading text-xs tracking-wider">
                    Manage Products
                  </TabsTrigger>
                  <TabsTrigger value="manage-categories" className="font-heading text-xs tracking-wider">
                    Manage Categories
                  </TabsTrigger>
                  <TabsTrigger value="products" className="font-heading text-xs tracking-wider">
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="events" className="font-heading text-xs tracking-wider">
                    Events
                  </TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  {(['7d', '30d', '90d', 'all'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        "px-4 py-2 text-xs font-heading tracking-wider uppercase border transition-all",
                        timeRange === range
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="product-card">
                    <CardHeader>
                      <CardTitle className="font-heading tracking-wider uppercase">Sales Trend</CardTitle>
                      <CardDescription>Revenue and orders over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.salesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="date" 
                            stroke="hsl(var(--muted-foreground))"
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '0',
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="sales" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            name="Revenue ($)"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="orders" 
                            stroke="hsl(var(--accent))" 
                            strokeWidth={2}
                            name="Orders"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="product-card">
                    <CardHeader>
                      <CardTitle className="font-heading tracking-wider uppercase">Category Distribution</CardTitle>
                      <CardDescription>Products by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={analytics.categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {analytics.categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="font-heading tracking-wider uppercase">Sales Performance</CardTitle>
                    <CardDescription>Daily sales and order volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={analytics.salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0',
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="sales" 
                          fill="hsl(var(--primary))" 
                          name="Revenue ($)"
                          radius={[0, 0, 0, 0]}
                        />
                        <Bar 
                          dataKey="orders" 
                          fill="hsl(var(--accent))" 
                          name="Orders"
                          radius={[0, 0, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="font-heading tracking-wider uppercase">Category Revenue</CardTitle>
                    <CardDescription>Revenue breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.categoryData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          type="number"
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          dataKey="category" 
                          type="category"
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0',
                          }}
                        />
                        <Bar 
                          dataKey="revenue" 
                          fill="hsl(var(--primary))" 
                          name="Revenue ($)"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manage-products" className="space-y-6">
                <ProductManagement />
              </TabsContent>

              <TabsContent value="manage-categories" className="space-y-6">
                <CategoryManagement />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="product-card">
                    <CardHeader>
                      <CardTitle className="font-heading tracking-wider uppercase">Top Products</CardTitle>
                      <CardDescription>Most viewed products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-heading text-xs tracking-wider uppercase">Product</TableHead>
                            <TableHead className="font-heading text-xs tracking-wider uppercase">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analytics.topProducts.length > 0 ? (
                            analytics.topProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-body">{product.name}</TableCell>
                                <TableCell className="font-heading">${product.price}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={2} className="text-center text-muted-foreground">
                                No product data available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="product-card">
                    <CardHeader>
                      <CardTitle className="font-heading tracking-wider uppercase">Category Stats</CardTitle>
                      <CardDescription>Product distribution and revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-heading text-xs tracking-wider uppercase">Category</TableHead>
                            <TableHead className="font-heading text-xs tracking-wider uppercase">Products</TableHead>
                            <TableHead className="font-heading text-xs tracking-wider uppercase">Revenue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analytics.categoryData.map((cat) => (
                            <TableRow key={cat.category}>
                              <TableCell className="font-body">{cat.category}</TableCell>
                              <TableCell className="font-heading">{cat.count}</TableCell>
                              <TableCell className="font-heading">${cat.revenue}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="font-heading tracking-wider uppercase">Event Analytics</CardTitle>
                    <CardDescription>User interaction events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.eventData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="event_type" 
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0',
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill="hsl(var(--primary))" 
                          name="Event Count"
                          radius={[0, 0, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="product-card">
                  <CardHeader>
                    <CardTitle className="font-heading tracking-wider uppercase">Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-heading text-xs tracking-wider uppercase">Order ID</TableHead>
                          <TableHead className="font-heading text-xs tracking-wider uppercase">Amount</TableHead>
                          <TableHead className="font-heading text-xs tracking-wider uppercase">Status</TableHead>
                          <TableHead className="font-heading text-xs tracking-wider uppercase">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.recentOrders.length > 0 ? (
                          analytics.recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-body font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                              <TableCell className="font-heading">${order.total_amount}</TableCell>
                              <TableCell>
                                <span className={cn(
                                  "px-2 py-1 text-xs font-heading tracking-wider uppercase",
                                  order.status === 'delivered' ? "bg-green-100 text-green-800" :
                                  order.status === 'processing' ? "bg-blue-100 text-blue-800" :
                                  order.status === 'shipped' ? "bg-purple-100 text-purple-800" :
                                  "bg-gray-100 text-gray-800"
                                )}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell className="font-body text-xs">
                                {new Date(order.created_at).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                              No orders available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPanel;

