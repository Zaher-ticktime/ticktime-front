import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const mockFriends = ["Ali", "Sara", "John"];

export default function Groups() {
  const [groupName, setGroupName] = useState("");
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  const toggleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const createGroup = () => {
    if (groupName && selected.length > 0) {
      setGroups((prev) => [...prev, { name: groupName, members: selected }]);
      setGroupName("");
      setSelected([]);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {!activeGroup ? (
        <>
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Create New Group</h2>
              <Input
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {mockFriends.map((name, i) => (
                  <Button
                    key={i}
                    variant={selected.includes(name) ? "default" : "outline"}
                    onClick={() => toggleSelect(name)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
              <Button onClick={createGroup} disabled={!groupName || selected.length === 0}>
                ➕ Create Group
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">My Groups</h3>
            {groups.map((g, i) => (
              <Card key={i}>
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <strong>{g.name}</strong>
                      <p className="text-sm text-gray-600">Members: {g.members.join(", ")}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveGroup(g)}>
                    Open Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Group: {activeGroup.name}</h3>
          <p className="text-sm text-gray-500">(Group chat component will appear here)</p>
          <Button className="mt-4" variant="outline" onClick={() => setActiveGroup(null)}>⬅️ Back</Button>
        </div>
      )}
    </div>
  );
}
