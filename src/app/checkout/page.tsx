"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, MapPin, Truck, CheckCircle2, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { cart, cartTotal, setLastOrder, clearCart } = useCart();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState<string | null>(null);

  // Address Management
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    state: "",
    city: ""
  });

  // Load Checkout Params (Discount/Coupon)
  useEffect(() => {
    const paramsStr = localStorage.getItem("checkout_params");
    if (paramsStr) {
      try {
        const { discount, coupon } = JSON.parse(paramsStr);
        setDiscount(discount || 0);
        setCoupon(coupon || null);
      } catch (e) {}
    }
  }, []);

  // Redirect to products if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/products");
    }
  }, [cart, router]);

  // Enforce authentication & load addresses
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    } else if (status === "authenticated") {
      fetchAddresses();
      // Pre-fill user data
      setFormData(prev => ({
        ...prev,
        fullName: session?.user?.name || prev.fullName
      }));
    }
  }, [status, session, router]);

  const fetchAddresses = async () => {
    setIsLoadingAddresses(true);
    try {
      const res = await fetch("/api/user/addresses");
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          const defaultAddr = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setIsAddingNew(true);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveNewAddress = async () => {
    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isDefault: addresses.length === 0 })
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
        const newAddr = data.addresses[data.addresses.length - 1];
        setSelectedAddressId(newAddr.id);
        setIsAddingNew(false);
      } else {
        alert("Please fill all required fields correctly.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving address");
    }
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNew) {
      saveNewAddress();
    } else if (!selectedAddressId) {
      alert("Please select or add a delivery address.");
      return;
    } else {
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get the selected address details
      const selectedAddr = addresses.find(a => a.id === selectedAddressId);
      if (!selectedAddr) throw new Error("No address selected");

      const shippingAddress = `${selectedAddr.addressLine1}, ${selectedAddr.addressLine2 ? selectedAddr.addressLine2 + ", " : ""}${selectedAddr.city}, ${selectedAddr.state} - ${selectedAddr.pincode}`;

      const paymentMode = "Cash on Delivery (COD)";
      
      const subtotal = cartTotal;
      const gst = Math.round(subtotal * 0.05);
      const shipping = subtotal > 499 || subtotal === 0 ? 0 : 50;
      const finalTotal = subtotal + gst + shipping - discount;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: finalTotal,
          paymentMode,
          shippingAddress
        })
      });
      
      if (!response.ok) throw new Error("Failed to place order");
      
      const data = await response.json();
      
      setLastOrder({
        items: [...cart],
        total: finalTotal,
        shippingInfo: {
          fullName: selectedAddr.fullName,
          mobile: selectedAddr.mobile,
          address: shippingAddress,
          pincode: selectedAddr.pincode,
          state: selectedAddr.state,
          city: selectedAddr.city
        },
        paymentMode,
        orderId: data.order.orderId
      });

      clearCart();
      localStorage.removeItem("checkout_params");
      router.push("/order-success");
    } catch (error) {
      console.error(error);
      alert("There was an issue placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) return null;

  // Calcs
  const subtotal = cartTotal;
  const gst = Math.round(subtotal * 0.05);
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 50;
  const finalTotal = subtotal + gst + shipping - discount;

  return (
    <main className="flex min-h-screen flex-col bg-ivory">
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row gap-12 pt-[88px]">
        
        {/* Left Column: Form Steps */}
        <div className="w-full lg:w-2/3">
          <h1 className="font-playfair text-3xl font-bold text-maroon mb-8">Secure Checkout</h1>
          
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 mb-10 text-sm font-medium">
            <div className={`flex items-center space-x-2 ${step === 1 ? 'text-maroon' : 'text-dark-text/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-maroon text-ivory' : 'bg-gray-200'}`}>1</div>
              <span>Shipping Details</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
            <div className={`flex items-center space-x-2 ${step === 2 ? 'text-maroon' : 'text-dark-text/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-maroon text-ivory' : 'bg-gray-200'}`}>2</div>
              <span>Payment Mode</span>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-maroon/10">
              <h2 className="text-xl font-bold text-dark-text mb-6 flex items-center"><MapPin className="mr-2 text-mustard" /> Delivery Address</h2>
              
              {isLoadingAddresses ? (
                <div className="py-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-maroon border-t-transparent rounded-full"></div></div>
              ) : (
                <>
                  {!isAddingNew && addresses.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {addresses.map((addr: any) => (
                        <label key={addr.id} className={`block p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-maroon bg-maroon/5 ring-1 ring-maroon' : 'border-gray-200 hover:border-maroon/50'}`}>
                          <div className="flex items-start">
                            <input 
                              type="radio" 
                              name="selectedAddress" 
                              value={addr.id} 
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="mt-1 text-maroon focus:ring-maroon border-gray-300" 
                            />
                            <div className="ml-3">
                              <p className="font-bold text-dark-text">{addr.fullName} <span className="font-normal text-sm text-dark-text/60 ml-2">{addr.mobile}</span></p>
                              <p className="text-dark-text/80 text-sm mt-1">{addr.addressLine1}</p>
                              {addr.addressLine2 && <p className="text-dark-text/80 text-sm">{addr.addressLine2}</p>}
                              <p className="text-dark-text/80 text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                      
                      <button 
                        type="button" 
                        onClick={() => setIsAddingNew(true)}
                        className="flex items-center text-maroon font-bold text-sm hover:underline mt-4"
                      >
                        <Plus size={16} className="mr-1" /> Add New Address
                      </button>
                    </div>
                  )}

                  {(isAddingNew || addresses.length === 0) && (
                    <form onSubmit={proceedToPayment} className="space-y-6">
                      {addresses.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-dark-text">Add New Address</h3>
                          <button type="button" onClick={() => setIsAddingNew(false)} className="text-sm text-dark-text/60 hover:text-dark-text">Cancel</button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">Full Name</label>
                          <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="Enter your full name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">Mobile Number</label>
                          <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="10-digit mobile number" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">Address Line 1</label>
                          <input required type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="House No, Building, Street" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">Address Line 2 (Optional)</label>
                          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="Locality/Area" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">Pincode</label>
                          <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="6 digits" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">State</label>
                          <select required name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all bg-white">
                            <option value="">Select State</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-text/70 mb-2">City</label>
                          <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all" placeholder="City/District" />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button type="submit" className="bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold py-4 px-10 rounded-xl transition-all shadow-md">
                          Save & Continue
                        </button>
                      </div>
                    </form>
                  )}

                  {!isAddingNew && addresses.length > 0 && (
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                      <button type="button" onClick={() => setStep(2)} disabled={!selectedAddressId} className="bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold py-4 px-10 rounded-xl transition-all shadow-md disabled:opacity-50">
                        Continue to Payment
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-maroon/10">
              <h2 className="text-xl font-bold text-dark-text mb-6 flex items-center"><CheckCircle2 className="mr-2 text-mustard" /> Select Payment Mode</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-maroon bg-maroon/5 rounded-xl cursor-pointer">
                  <input type="radio" name="payment" value="cod" defaultChecked className="w-5 h-5 text-maroon focus:ring-maroon border-gray-300" />
                  <div className="ml-4 flex-grow">
                    <span className="block font-bold text-lg text-dark-text">Cash on Delivery (COD)</span>
                    <span className="block text-sm text-dark-text/60 mt-1">Pay when your order arrives at your doorstep.</span>
                  </div>
                  <Truck size={32} className="text-maroon opacity-50" />
                </label>

                {/* Disabled Online Payment placeholder */}
                <label className="flex items-center p-4 border border-gray-200 bg-gray-50 rounded-xl opacity-50 cursor-not-allowed">
                  <input type="radio" name="payment" value="online" disabled className="w-5 h-5" />
                  <div className="ml-4">
                    <span className="block font-bold text-lg text-dark-text">Pay Online</span>
                    <span className="block text-sm text-dark-text/60 mt-1">UPI, Credit Card, Debit Card, Net Banking, Wallet</span>
                  </div>
                </label>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-100 flex justify-between items-center">
                <button onClick={() => setStep(1)} className="text-maroon font-medium hover:underline px-4 py-2">
                  Back to Address
                </button>
                <button onClick={handlePlaceOrder} disabled={isSubmitting} className="bg-mustard hover:bg-[#c49314] text-dark-text font-bold py-4 px-10 rounded-xl transition-all shadow-md text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Processing..." : "Place Order Now"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/10 sticky top-[100px]">
            <h2 className="text-xl font-bold text-dark-text mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex space-x-4 items-center">
                  <div className="relative w-16 h-16 bg-ivory rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-dark-text line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-dark-text/60">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-maroon text-sm">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
              <div className="flex justify-between text-dark-text/70">
                <span>Subtotal</span>
                <span className="font-medium text-dark-text">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount {coupon ? `(${coupon})` : ""}</span>
                  <span className="font-medium">- ₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-dark-text/70">
                <span>Estimated GST (5%)</span>
                <span className="font-medium text-dark-text">₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-dark-text/70">
                <span>Shipping Fee</span>
                {shipping === 0 ? (
                  <span className="font-bold text-green-600">FREE</span>
                ) : (
                  <span className="font-medium text-dark-text">₹{shipping}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-end pt-6 mt-6 border-t border-gray-200">
              <span className="font-bold text-lg text-dark-text">Total Payable</span>
              <span className="font-bold text-3xl text-maroon">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
