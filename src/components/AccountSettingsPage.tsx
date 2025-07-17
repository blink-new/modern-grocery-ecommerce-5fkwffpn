import { useState } from 'react';
import { ArrowLeft, User, Camera, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import toast from 'react-hot-toast';

interface AccountSettingsPageProps {
  onBack: () => void;
}

export default function AccountSettingsPage({ onBack }: AccountSettingsPageProps) {
  // User data state
  const [userData, setUserData] = useState({
    firstName: 'Leslie',
    lastName: 'Cooper',
    email: 'example@gmail.com',
    phone: '+012-456-789',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face'
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = () => {
    // Validate required fields
    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    if (userData.phone && !userData.phone.match(/^[+]?[0-9\-\s()]+$/)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    toast.success('Profile updated successfully!');
  };

  const handlePasswordUpdate = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    toast.success('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordFields(false);
  };

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    toast.success('Avatar upload feature would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Account</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Home</span>
                  <span>/</span>
                  <span>My Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1">
                  <Button
                    variant="default"
                    className="w-full justify-start rounded-none bg-amber-400 hover:bg-amber-500 text-black font-medium"
                  >
                    Personal Information
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-gray-600 hover:bg-gray-50"
                  >
                    My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-gray-600 hover:bg-gray-50"
                  >
                    Manage Address
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-gray-600 hover:bg-gray-50"
                  >
                    Payment Method
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-gray-600 hover:bg-gray-50"
                  >
                    Password Manager
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-gray-600 hover:bg-gray-50"
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6 mb-8">
                  {/* Profile Picture */}
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={userData.avatar} alt={userData.firstName} />
                      <AvatarFallback className="text-lg bg-primary text-white">
                        {userData.firstName[0]}{userData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                      onClick={handleAvatarChange}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <div className="absolute -top-1 -right-1">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className="h-10"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="h-10"
                      />
                    </div>

                    {/* Gender Field */}
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={userData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Update Button */}
                    <Button 
                      onClick={handleUpdateProfile}
                      className="bg-primary hover:bg-primary/90 text-white px-8"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Changes
                    </Button>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Password Management Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Password Management</h3>
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                    >
                      {showPasswordFields ? 'Cancel' : 'Change Password'}
                    </Button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium">
                          Current Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            placeholder="Enter current password"
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium">
                          New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            placeholder="Enter new password"
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            placeholder="Confirm new password"
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        onClick={handlePasswordUpdate}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        Update Password
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Service Features Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
                <span className="text-white text-sm">📦</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">Free shipping for order above $50</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
                <span className="text-white text-sm">💳</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Payment</h3>
            <p className="text-sm text-gray-600">Multiple secure payment options</p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
                <span className="text-white text-sm">🎧</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24x7 Support</h3>
            <p className="text-sm text-gray-600">We support online all days</p>
          </Card>
        </div>
      </div>
    </div>
  );
}