# Using AuthContext for User Data

## Overview

The AuthContext now manages user data (email, username, profile image) and provides functions to update this data. You can access user data anywhere in your app using the `useAuth` hook.

## Available User Data

### From AuthContext:

```javascript
const { userData, updateUsername, updateProfileImage } = useAuth();
```

### userData Object:

```javascript
{
  email: "user@example.com",
  username: "john_doe",
  photoURL: "https://example.com/photo.jpg",
  uid: "user123"
}
```

## Usage Examples

### 1. Display User Information

```javascript
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { userData } = useAuth();

  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      <p>Email: {userData.email}</p>
      {userData.photoURL && <img src={userData.photoURL} alt="Profile" />}
    </div>
  );
}
```

### 2. Update Username

```javascript
import { useAuth } from "../context/AuthContext";

function UpdateUsername() {
  const { updateUsername } = useAuth();
  const [newUsername, setNewUsername] = useState("");

  const handleUpdate = async () => {
    const success = await updateUsername(newUsername);
    if (success) {
      console.log("Username updated successfully!");
    } else {
      console.log("Failed to update username");
    }
  };

  return (
    <div>
      <input
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New username"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
```

### 3. Update Profile Image

```javascript
import { useAuth } from "../context/AuthContext";

function UpdateProfileImage() {
  const { updateProfileImage } = useAuth();

  const handleImageUpload = async (file) => {
    // In a real app, you'd upload to Firebase Storage first
    const imageUrl = URL.createObjectURL(file);
    const success = await updateProfileImage(imageUrl);

    if (success) {
      console.log("Profile image updated!");
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e.target.files[0])}
    />
  );
}
```

### 4. Conditional Rendering Based on User Data

```javascript
import { useAuth } from "../context/AuthContext";

function ConditionalComponent() {
  const { userData } = useAuth();

  if (!userData.username) {
    return <div>Please set your username</div>;
  }

  return (
    <div>
      <h1>Hello, {userData.username}!</h1>
      {userData.photoURL ? (
        <img src={userData.photoURL} alt="Profile" />
      ) : (
        <div>No profile picture</div>
      )}
    </div>
  );
}
```

## Benefits

1. **Centralized Data**: All user data is managed in one place
2. **Automatic Updates**: When user data changes, all components using it will re-render
3. **Easy Access**: No need to fetch user data in each component
4. **Consistent State**: User data is always in sync across the app
5. **Type Safety**: Clear structure for user data

## Integration with SettingsContent

The SettingsContent component now uses AuthContext instead of directly accessing Firebase, making it:

- More maintainable
- Easier to test
- Consistent with the rest of the app
- Better error handling

## Next Steps

1. **Firebase Storage Integration**: Add proper image upload to Firebase Storage
2. **Data Validation**: Add validation for username updates
3. **Loading States**: Add loading indicators during updates
4. **Error Handling**: Improve error messages and user feedback
5. **Caching**: Add offline support for user data
