namespace fakeboxd
{
	partial class Form2
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form2));
            button1 = new Button();
            pictureBox1 = new PictureBox();
            label3 = new Label();
            textBox1 = new TextBox();
            button2 = new Button();
            flowLayoutPanel1 = new FlowLayoutPanel();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            SuspendLayout();
            // 
            // button1
            // 
            button1.BackColor = Color.FromArgb(104, 130, 155);
            button1.FlatAppearance.BorderSize = 0;
            button1.FlatStyle = FlatStyle.Popup;
            button1.ForeColor = SystemColors.ControlLight;
            button1.Location = new Point(711, 12);
            button1.Name = "button1";
            button1.Size = new Size(77, 30);
            button1.TabIndex = 0;
            button1.Text = "Voltar";
            button1.UseVisualStyleBackColor = false;
            button1.Click += button1_Click;
            // 
            // pictureBox1
            // 
            pictureBox1.Image = (Image)resources.GetObject("pictureBox1.Image");
            pictureBox1.Location = new Point(0, -3);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(114, 66);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 2;
            pictureBox1.TabStop = false;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 14.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            label3.ForeColor = SystemColors.ControlLightLight;
            label3.Location = new Point(120, 17);
            label3.Name = "label3";
            label3.Size = new Size(86, 25);
            label3.TabIndex = 15;
            label3.Text = "Registrar";
            // 
            // textBox1
            // 
            textBox1.BackColor = Color.FromArgb(104, 130, 155);
            textBox1.BorderStyle = BorderStyle.None;
            textBox1.Cursor = Cursors.IBeam;
            textBox1.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            textBox1.ForeColor = SystemColors.Window;
            textBox1.Location = new Point(14, 86);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(243, 16);
            textBox1.TabIndex = 16;
            textBox1.Text = "Buscar filmes...";
            textBox1.TextChanged += textBox1_TextChanged;
            textBox1.Enter += TextBox1_Enter;
            textBox1.KeyDown += textBox1_KeyDown;
            textBox1.Leave += TextBox1_Leave;
            // 
            // button2
            // 
            button2.BackColor = Color.FromArgb(104, 130, 155);
            button2.FlatAppearance.BorderSize = 0;
            button2.FlatStyle = FlatStyle.Popup;
            button2.ForeColor = SystemColors.ControlLight;
            button2.Location = new Point(263, 81);
            button2.Name = "button2";
            button2.Size = new Size(69, 25);
            button2.TabIndex = 17;
            button2.Text = "Buscar";
            button2.UseVisualStyleBackColor = false;
            button2.Click += button2_Click;
            // 
            // flowLayoutPanel1
            // 
            flowLayoutPanel1.Location = new Point(14, 139);
            flowLayoutPanel1.Name = "flowLayoutPanel1";
            flowLayoutPanel1.Size = new Size(774, 264);
            flowLayoutPanel1.TabIndex = 18;
            flowLayoutPanel1.Paint += flowLayoutPanel1_Paint;
            // 
            // Form2
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(32, 40, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(flowLayoutPanel1);
            Controls.Add(button2);
            Controls.Add(textBox1);
            Controls.Add(label3);
            Controls.Add(pictureBox1);
            Controls.Add(button1);
            Name = "Form2";
            Text = "Form2";
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button button1;
		private PictureBox pictureBox1;
		private Label label3;
		private TextBox textBox1;
        private Button button2;
        private FlowLayoutPanel flowLayoutPanel1;
    }
}