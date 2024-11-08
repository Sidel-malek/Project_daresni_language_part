import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddSessionDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <DialogHeader>
          <DialogTitle>Cree une session</DialogTitle>
        </DialogHeader>
        <form className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 items-end">
          <div className="space-y-2">
            <Label htmlFor="module">
              Nom de module<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Nom de module" name="module" id="module" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tarif">
              Tarif<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Tarif" name="tarif" id="tarif" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duree">
              Durèe des séances<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Durèe des séances" name="duree" id="duree" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="durees">
              Durèe<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Durèe" name="durees" id="durees" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">
              Nombre de seance<span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Nombre de seance"
              name="count"
              id="count"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="etudiants">
              Nombre maximal des etudiants
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Nombre maximal des etudiants"
              name="etudiants"
              id="etudiants"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niveau">
              Niveau<span className="text-red-500">*</span>
            </Label>
            <Select name="niveau" id="niveau">
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Niveau</SelectLabel>
                  <SelectItem value="CEM">CEM</SelectItem>
                  <SelectItem value="LYCEE">LYCEE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="annee">
              Année<span className="text-red-500">*</span>
            </Label>
            <Select name="annee" id="annee">
              <SelectTrigger>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Année</SelectLabel>
                  <SelectItem value="1">1ere annee</SelectItem>
                  <SelectItem value="2">2eme annee</SelectItem>
                  <SelectItem value="3">3eme annee</SelectItem>
                  <SelectItem value="4">4eme annee</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialite">
              Spécialité<span className="text-red-500">*</span>
            </Label>
            <Select name="specialite" id="specialite">
              <SelectTrigger>
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Spécialité</SelectLabel>
                  <SelectItem value="matheleme">Matheleme</SelectItem>
                  <SelectItem value="scientifique">Scientifique</SelectItem>
                  <SelectItem value="lettre">Lettre</SelectItem>
                  <SelectItem value="gestion">Gestion</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:col-start-2 lg:col-start-3">
            Sauvegarder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
